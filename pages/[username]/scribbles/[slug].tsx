import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import HoverCard from "@/components/HoverCard/HoverCard";
import Switch from "@/components/Switch/Switch";
import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout, PostsJoins } from "@/utils/types";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiDisc } from "@react-icons/all-files/fi/FiDisc";
import { useAuth } from "context/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useGetPost from "hooks/supabase-hooks/post/useGetPost";
import throttle from "lodash/throttle";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditScribbleButton from "ui/EditScribbleButton/EditScribbleButton";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";
import Layout from "ui/Layout/Layout";
import { NextSeo } from "next-seo";

dayjs.extend(relativeTime);

const PostComments = dynamic(() => import("ui/PostComments/PostComments"), {
  ssr: false,
  loading: () => <div className="h-8" />,
});

type ScribblePageProps = {
  scribble: PostsJoins;
};

export const getServerSideProps: GetServerSideProps<ScribblePageProps> = async (
  context
) => {
  const params = context.params; // params.slug

  const { data } = await supabase
    .from<definitions["posts"]>("posts")
    .select(
      `
      id,
      created_at,
      emoji,
      title,
      slug,
      user:user_id (*),
      closed,
      closed_at,
      comment_count,
      can_others_comment,
      user_id,
      tags (*)
    `
    )
    .match({
      slug: params!.slug as string,
      post_type: "scribble",
    })
    .single();

  if (data) {
    // check if archived
    return {
      props: {
        scribble: data as PostsJoins,
      },
    };
  }

  return {
    notFound: true,
  };
};

const ScribblePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { scribble } = props;
  const { user, loading } = useAuth();
  // should hydrate
  const { data, isValidating, mutate } = useGetPost(scribble.id, scribble);

  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = document.documentElement || document.body;
      if (scrollTop > 153 && scrolledPast === false) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };
    const handleThrottledScroll = throttle(handleScroll, 250);

    window.addEventListener("scroll", handleThrottledScroll);

    return () => window.removeEventListener("scroll", handleThrottledScroll);

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Fallback />;
  }

  if (data) {
    const handleUpdatePost = (newTitle: string) => {
      mutate({ ...data, title: newTitle }, false);
    };

    const goToBottom = () => {
      if (typeof window !== undefined) {
        const commentBox = document.getElementById("issue-comment-box");
        if (commentBox) {
          window.scrollTo({
            top: commentBox.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };

    // comment handlers
    const handleOnCreateComment = async (
      createdComment: definitions["post_comments"]
    ) => {
      mutate({ ...data, comment_count: data.comment_count + 1 }, false);
    };

    const handleDeleteComment = async (deletedCommentId: number) => {
      // since we dont know if the comment has replies.
      // refetch it all
      await mutate();
    };

    // closed handlers
    const handleCloseScribble = async () => {
      mutate({ ...data, closed: true }, false);

      await supabase
        .from<definitions["posts"]>("posts")
        .update({
          closed: true,
        })
        .eq("id", data.id);

      mutate();
    };

    const handleReopenScribble = async () => {
      mutate({ ...data, closed: false }, false);

      await supabase
        .from<definitions["posts"]>("posts")
        .update({
          closed: false,
        })
        .eq("id", data.id);

      mutate();
    };

    return (
      <>
        <NextSeo
          title={scribble.title}
          description={`Scribble by ${scribble.user.display_name}. ${scribble.comment_count} comments`}
        />
        <div className="bg-base pb-16">
          {scrolledPast && (
            <aside className="block fixed top-0 left-0 right-0 bg-paper border-t border-b z-50">
              <Container size="wide">
                <div className="flex py-2 items-center space-x-2">
                  <Button
                    color={data.closed ? "default" : "primary"}
                    isRound
                    as="div"
                    size="sm"
                    className="pointer-events-none"
                    leftIcon={data.closed ? <FiCheckCircle /> : <FiDisc />}
                  >
                    {data.closed ? "Closed" : "Open"}
                  </Button>
                  <div>
                    <div className="text-sm font-semibold mb-1">
                      {data.emoji} {data.title}
                    </div>
                    <div className="text-xs text-tMuted space-x-1">
                      <HoverCard
                        openDelay={300}
                        contentClassname="w-[300px] p-4"
                        content={<HoverUserCard user={data.user} />}
                      >
                        <span>
                          <Link href={`/${data.user.username}`} passHref>
                            <a className="hover:underline hover:text-primary">
                              {data.user.username}
                            </a>
                          </Link>
                        </span>
                      </HoverCard>

                      <span>
                        opened this data{" "}
                        <time
                          aria-label="created at"
                          dateTime={data.created_at}
                        >
                          {dayjs(data.created_at).fromNow()}
                        </time>
                      </span>
                      <span>·</span>
                      <span>{data.comment_count} comments</span>
                    </div>
                  </div>
                </div>
              </Container>
            </aside>
          )}

          <Container size="wide">
            <header className="pt-4">
              <div className="flex flex-col-reverse md:flex-row gap-4 mb-2 items-start justify-between ">
                <h1 className="text-xl font-semibold">
                  {data.emoji} {data.title}
                </h1>

                {user?.id === scribble.user_id && (
                  <div className="flex w-full md:w-auto items-center justify-between flex-shrink-0">
                    <EditScribbleButton
                      id={data.id}
                      title={data.title}
                      onUpdateMutation={handleUpdatePost}
                    />
                    <Button
                      className="md:hidden"
                      size="sm"
                      variant="ghost"
                      onClick={goToBottom}
                    >
                      Jump to bottom
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center flex-wrap gap-2 md:border-b pb-4">
                <Button
                  color={data.closed ? "default" : "primary"}
                  isRound
                  as="div"
                  size="sm"
                  className="pointer-events-none"
                  leftIcon={data.closed ? <FiCheckCircle /> : <FiDisc />}
                >
                  {data.closed ? "Closed" : "Open"}
                </Button>
                <div className="text-sm text-tMuted space-x-1">
                  <HoverCard
                    openDelay={300}
                    contentClassname="w-[300px] p-4"
                    content={<HoverUserCard user={data.user} />}
                  >
                    <span>
                      <Link href={`/${data.user.username}`} passHref>
                        <a className="hover:underline hover:text-primary">
                          {data.user.username}
                        </a>
                      </Link>
                    </span>
                  </HoverCard>

                  <span>
                    opened this data{" "}
                    <time aria-label="created at" dateTime={data.created_at}>
                      {dayjs(data.created_at).fromNow()}
                    </time>
                  </span>
                  <span>·</span>
                  <span>{data.comment_count} comments</span>
                </div>
              </div>
            </header>
          </Container>
          <Container
            size="wide"
            className="mx-0 px-0 sm:mx-auto sm:px-6 md:px-10"
          >
            <div className="block lg:flex lg:justify-between">
              <section className="w-full lg:w-[calc(100%-330px)]">
                {data.comment_count === 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm">Let&apos;s add our first comment!</p>
                  </div>
                )}
                <div className="mt-4">
                  <PostComments
                    hideHeader
                    hideEditor={
                      data.closed ||
                      (data.can_others_comment && user?.id !== data.user_id)
                    }
                    postId={data.id}
                    postOwner={data.user_id}
                    onCreateCallback={handleOnCreateComment}
                    onDeleteCallback={handleDeleteComment}
                  />
                  {data.closed && (
                    <div className="flex items-center space-x-2 mt-4 mx-3 md:ml-14 md:mr-0">
                      <FiCheckCircle className="text-primary" />
                      <div className="text-tMuted font-semibold ">
                        <span>This scribble has been closed </span>
                        <time aria-label="closed at" dateTime={data.closed_at}>
                          {dayjs(data.closed_at).fromNow()}
                        </time>
                      </div>
                    </div>
                  )}
                </div>
              </section>
              {user?.id === scribble.user_id && (
                <aside className="block mt-4 lg:w-[300px]">
                  <div className="h-full">
                    <div className="sticky top-16 max-h-[calc(100vh-50px)] flex flex-col">
                      <div className="p-5 mx-3 md:ml-14 md:mr-0 sm:max-w-[300px] lg:mx-0 bg-paper rounded-lg border">
                        <div className="text-xl font-semibold mb-4">
                          Settings
                        </div>
                        {isValidating ? (
                          <Fallback />
                        ) : (
                          <>
                            {data.closed ? (
                              <Button
                                isFullWidth
                                variant="outline"
                                leftIcon={<FiCheckCircle />}
                                onClick={handleReopenScribble}
                              >
                                Reopen scribble
                              </Button>
                            ) : (
                              <Button
                                isFullWidth
                                variant="outline"
                                leftIcon={<FiDisc />}
                                onClick={handleCloseScribble}
                              >
                                Close scribble
                              </Button>
                            )}

                            <div className="flex items-center space-x-3 mt-3">
                              <label
                                htmlFor="allow_others"
                                className="text-sm font-semibold text-tMuted"
                              >
                                Others can comment
                              </label>
                              <Switch id="allow_others" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </Container>
        </div>
      </>
    );
  }

  return null;
};

ScribblePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ScribblePage;
