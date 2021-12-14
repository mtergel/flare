import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout, PostsJoins } from "@/utils/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "ui/Layout/Layout";
import { FiDisc } from "@react-icons/all-files/fi/FiDisc";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import HoverCard from "@/components/HoverCard/HoverCard";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";
import useGetArticle from "hooks/supabase-hooks/articles/useGetArticle";

dayjs.extend(relativeTime);

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

  // enable code if you add logging service online
  // if (error) {
  //   log.(error.message)
  // }

  return {
    notFound: true,
  };
};

const ScribblePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { scribble } = props;
  // should hydrate
  const { data } = useGetArticle(scribble.id);
  console.log(data);

  return (
    <div className="bg-base pb-16">
      {/* <aside className="block sticky top-0 bg-paper border-t border-b z-50 lg:hidden">
    <Container size="wide">
      <div className="flex items-center justify-between h-14">
        <Link href={`/${article.user.username}`} passHref>
          <a className="flex items-center min-w-0">
            <span className="mr-2 flex-shrink-0">
              <Avatar
                src={article.user.avatar_url || undefined}
                fallback={article.user.display_name}
              />
            </span>
            <span className="text-sm font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
              {article.user.username}
            </span>
          </a>
        </Link>
        <div className="flex items-center space-x-3">
          {headings.length > 0 && (
            <MobileToc activeId={activeId} headings={headings} />
          )}
          <PostLikeButton
            post_id={article.id}
            like_count={article.like_count}
            hideCount
          />
        </div>
      </div>
    </Container>
  </aside> */}
      <Container size="wide">
        <header className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <Button size="sm">Edit</Button>
            <span className="text-sm">Jump to bottom</span>
          </div>
          <h1 className="text-xl font-semibold mb-2">
            {scribble.emoji} {scribble.title}
          </h1>
          <div className="flex items-center flex-wrap gap-2 border-b pb-4 mb-8">
            <Button
              color="primary"
              isRound
              as="div"
              size="sm"
              className="pointer-events-none"
              leftIcon={scribble.closed ? <FiCheckCircle /> : <FiDisc />}
            >
              Open
            </Button>
            <div className="text-sm text-tMuted space-x-1">
              <HoverCard
                openDelay={300}
                contentClassname="w-[300px] p-4"
                content={<HoverUserCard user={scribble.user} />}
              >
                <span>
                  <Link href={`/${scribble.user.username}`} passHref>
                    <a className="hover:underline hover:text-primary">
                      {scribble.user.username}
                    </a>
                  </Link>
                </span>
              </HoverCard>

              <span>
                opened this scribble{" "}
                <time aria-label="created at" dateTime={scribble.created_at}>
                  {dayjs(scribble.created_at).fromNow()}
                </time>
              </span>
              <span>·</span>
              <span>{scribble.comment_count} comments</span>
            </div>
          </div>
        </header>
      </Container>
      <Container size="wide" className="mx-0 px-0 sm:mx-auto sm:px-6 md:px-10">
        <div className="block lg:flex lg:justify-between">
          <section className="w-full lg:w-[calc(100%-330px)]">
            <div className="py-8 rounded-none bg-paper sm:rounded-xl sm:shadow-main">
              <Container>
                {/* <div className="flex flex-none items-center overflow-x-auto mb-4 gap-2 lg:hidden">
              {article.tags.map((i) => (
                <Tag tag={i} key={i.id} />
              ))}
            </div> */}
                <div>Content here.</div>
                <div className="mt-10">
                  {/* <PostLikeButton
                post_id={article.id}
                like_count={article.like_count}
              /> */}
                </div>
              </Container>
            </div>
          </section>
          <aside className="hidden lg:block lg:w-[300px]">
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
                    <Link passHref href={`/${scribble.user.username}`}>
                      <a>
                        <Avatar
                          size="lg"
                          src={scribble.user.avatar_url || undefined}
                          fallback={scribble.user.display_name}
                        />
                      </a>
                    </Link>
                    <div className="w-[calc(100%-70px)]">
                      <Link passHref href={`/${scribble.user.username}`}>
                        <a>
                          <div>
                            <div className="font-semibold text-sm">
                              {scribble.user.display_name}
                            </div>
                            <div className="text-tMuted text-xs">{`@${scribble.user.username}`}</div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">{scribble.user.bio}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
      <Container size="wide" className="pt-6 md:pt-12">
        <section className="w-full lg:w-[calc(100%-330px)]">
          Comments here
        </section>
      </Container>
    </div>
  );
};

ScribblePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ScribblePage;
