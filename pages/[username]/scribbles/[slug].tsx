import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import HoverCard from "@/components/HoverCard/HoverCard";
import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout, PostsJoins } from "@/utils/types";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiDisc } from "@react-icons/all-files/fi/FiDisc";
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
  // should hydrate
  const { data, mutate } = useGetPost(scribble.id, scribble);

  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = document.documentElement || document.body;
      if (scrollTop > 160 && scrolledPast === false) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };
    const handleThrottledScroll = throttle(handleScroll, 250);

    window.addEventListener("scroll", handleThrottledScroll);

    return () => window.removeEventListener("scroll", handleThrottledScroll);
  }, []);

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

    return (
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
                  Open
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
                      <time aria-label="created at" dateTime={data.created_at}>
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
            <div className="flex items-center justify-between mb-4">
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
            <h1 className="text-xl font-semibold mb-2">
              {data.emoji} {data.title}
            </h1>
            <div className="flex items-center flex-wrap gap-2 border-b pb-4">
              <Button
                color={data.closed ? "default" : "primary"}
                isRound
                as="div"
                size="sm"
                className="pointer-events-none"
                leftIcon={data.closed ? <FiCheckCircle /> : <FiDisc />}
              >
                Open
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
              {/* <div className="flex flex-none items-center overflow-x-auto mb-4 gap-2 lg:hidden">
                {article.tags.map((i) => (
                  <Tag tag={i} key={i.id} />
                ))}
              </div> */}
              {data.comment_count === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm">Let's add our first comment!</p>
                </div>
              )}
              <PostComments
                hideHeader
                postId={data.id}
                postOwner={data.user_id}
                onCreateCallback={handleOnCreateComment}
                onDeleteCallback={handleDeleteComment}
              />
            </section>
            <aside className="block mt-4 lg:w-[300px]">
              <div className="h-full">
                {/* {article.tags.length > 0 && (
              <>
                <div className="bg-paper rounded-xl pt-4 px-5 pb-6 shadow-main">
                  <div className="font-semibold">Tags</div>
                  <div className="flex flex-wrap justify-between">
                    {article.tags.map((i) => (
                      <Tag
                        tag={i}
                        key={i.id}
                        className="flex space-x-1 items-center mt-3 flex-1 min-w-[49%] border-0 text-xs"
                        largeImage
                      />
                    ))}
                  </div>
                </div>
                <div className="h-6" />
              </>
            )} */}

                <div className="sticky top-8 max-h-[calc(100vh-50px)] flex flex-col">
                  <div className="p-5 bg-paper rounded-xl shadow-main">
                    <div className="flex items-center justify-between">
                      <Link passHref href={`/${data.user.username}`}>
                        <a>
                          <Avatar
                            size="lg"
                            src={data.user.avatar_url || undefined}
                            fallback={data.user.display_name}
                          />
                        </a>
                      </Link>
                      <div className="w-[calc(100%-70px)]">
                        <Link passHref href={`/${data.user.username}`}>
                          <a>
                            <div>
                              <div className="font-semibold text-sm">
                                {data.user.display_name}
                              </div>
                              <div className="text-tMuted text-xs">{`@${data.user.username}`}</div>
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                    <p className="mt-4 text-sm">{data.user.bio}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    );
  }

  return null;
};

ScribblePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ScribblePage;
