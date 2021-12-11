import Tag from "@/components/ArticleCard/Tag";
import Avatar from "@/components/Avatar/Avatar";
import Container from "@/components/Container/Container";
import MobileToc from "@/components/Toc/MobileToc";
import Toc from "@/components/Toc/Toc";
import { definitions } from "@/utils/generated";
import { markdownProcessor } from "@/utils/markdownProcessor";
import { supabase } from "@/utils/supabaseClient";
import { MDHeading, PostsJoins } from "@/utils/types";
import updateViewCount from "@/utils/updateViewCount";
import { FiCalendar } from "@react-icons/all-files/fi/FiCalendar";
import { FiClock } from "@react-icons/all-files/fi/FiClock";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import dayjs from "dayjs";
import useIntersectionObserver from "hooks/useIntersectionObserver";
// @ts-ignore
import toc from "markdown-toc";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Layout from "ui/Layout/Layout";
import PostLikeButton from "ui/LikeButton/PostLikeButton";
import { NextPageWithLayout } from "utils/types";

type ArticlePageProps = {
  isPreview: boolean;
  headings: MDHeading[];
  article: PostsJoins;
  renderHTML: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (
  context
) => {
  const params = context.params;
  supabase.auth.setAuth(process.env.SERVICE_KEY!);
  const res = await supabase
    .from<definitions["posts"]>("posts")
    .select(
      `
      *,
      tags (*),
      user:user_id (*)
      `
    )
    .match({
      slug: params!.slug as string,
      post_type: "article",
    })
    .single();

  if (res.data) {
    // preview mode or article is published
    // can be viewed
    if (res.data.published || context.preview) {
      // generate headings
      const headings = toc(res.data.body_markdown, {
        maxDepth: 2,
      });

      let isPreview =
        !res.data.published ||
        (context.preview && context.previewData === params!.slug);

      const file = await markdownProcessor.process(
        res.data.body_markdown ?? ""
      );

      return {
        props: {
          isPreview: isPreview ?? false,
          headings: headings.json,
          article: res.data as PostsJoins,
          renderHTML: String(file),
        },
        revalidate: 300,
      };
    }
  }

  return {
    notFound: true,
  };
};

const ArticlePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { isPreview, headings, article, renderHTML } = props;
  // observor for toc
  const [activeId, setActiveId] = useState("");
  const callbackHandler = (id: string) => {
    setActiveId(id);
  };
  useIntersectionObserver(callbackHandler);

  const handleViews = useCallback(async () => {
    if (!isPreview) {
      await updateViewCount(article.slug);
    }
  }, [article.slug, isPreview]);

  useEffect(() => {
    handleViews();
  }, [handleViews]);

  return (
    <article className="bg-base pb-16">
      {isPreview && (
        <Link href={`/articles/${article.id}/edit`} passHref>
          <a className="flex items-center justify-center bg-gray-600 text-paper text-sm py-4 font-bold">
            <FiPlay className="mr-2 h-5 w-5" />
            <span>Preview Mode (Edit)</span>
          </a>
        </Link>
      )}
      <aside className="block sticky top-0 bg-paper border-t border-b z-50 lg:hidden">
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
      </aside>
      <header className="pt-10 pb-16">
        <Container size="wide">
          <div className="relative text-center space-y-6">
            <div className="text-7xl">
              <span>{article.emoji}</span>
            </div>
            <h1 className="text-3xl inline-block max-w-3xl">
              <span className="font-bold text-center">{article.title}</span>
            </h1>
            <div className="flex items-center justify-center text-sm text-tMuted space-x-6">
              {article.published_at && (
                <div className="flex items-center space-x-1">
                  <span>
                    <FiCalendar className="h-4 w-4" />
                  </span>
                  <time dateTime={article.published_at}>
                    {dayjs(article.published_at).format("YYYY.MM.DD")}
                  </time>
                </div>
              )}

              {article.reading_time && (
                <div className="flex items-center space-x-1">
                  <span>
                    <FiClock className="h-4 w-4" />
                  </span>
                  <span>{`${article.reading_time} min read`}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>
      <Container size="wide" className="mx-0 px-0 sm:mx-auto sm:px-6 md:px-10">
        <div className="block lg:flex lg:justify-between">
          <section className="w-full lg:w-[calc(100%-330px)]">
            <div className="py-8 rounded-none bg-paper sm:rounded-xl sm:shadow-main">
              <Container>
                <div className="flex flex-none items-center overflow-x-auto mb-4 gap-2 lg:hidden">
                  {article.tags.map((i) => (
                    <Tag tag={i} key={i.id} />
                  ))}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: renderHTML }}
                  className="prose dark:prose-invert w-full max-w-full"
                />
                <div className="mt-10">
                  <PostLikeButton
                    post_id={article.id}
                    like_count={article.like_count}
                  />
                </div>
              </Container>
            </div>
          </section>
          <aside className="hidden lg:block lg:w-[300px]">
            <div className="h-full">
              {article.tags.length > 0 && (
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
              )}

              <div className="sticky top-8 max-h-[calc(100vh-50px)] flex flex-col">
                <div className="p-5 bg-paper rounded-xl shadow-main">
                  <div className="flex items-center justify-between">
                    <Link passHref href={`/${article.user.username}`}>
                      <a>
                        <Avatar
                          size="lg"
                          src={article.user.avatar_url || undefined}
                          fallback={article.user.display_name}
                        />
                      </a>
                    </Link>
                    <div className="w-[calc(100%-70px)]">
                      <Link passHref href={`/${article.user.username}`}>
                        <a>
                          <div>
                            <div className="font-semibold text-sm">
                              {article.user.display_name}
                            </div>
                            <div className="text-tMuted text-xs">{`@${article.user.username}`}</div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">{article.user.bio}</p>
                </div>
                {headings.length > 0 && (
                  <>
                    <div className="h-6 block w-[1px] flex-shrink-0" />
                    <div className="p-5 bg-paper rounded-xl overflow-auto shadow-main">
                      <div className="font-semibold mb-4">Table of Content</div>
                      <Toc headings={headings} activeId={activeId} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
};

ArticlePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ArticlePage;
