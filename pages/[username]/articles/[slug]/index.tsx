import Avatar from "@/components/Avatar/Avatar";
import Container from "@/components/Container/Container";
import Preview from "@/components/Editor/Preview";
import ToCDD from "@/components/Toc/Toc";
import { MDHeading } from "@/utils/types";
import { FiCalendar } from "@react-icons/all-files/fi/FiCalendar";
import { FiClock } from "@react-icons/all-files/fi/FiClock";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import dayjs from "dayjs";
import {
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
  PostsStaticPathsDocument,
  PostsStaticPathsQuery,
  PostsStaticPathsQueryVariables,
  useGetPostBySlugQuery,
} from "graphql/generated/graphql";
// @ts-ignore
import toc from "markdown-toc";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import readingTime from "reading-time";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { NextComponentTypeWithLayout, NextPageWithLayout } from "utils/types";

type ArticlePageProps = {
  isPreview: boolean;
  headings: MDHeading[];
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "https://flare.hasura.app/v1/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      suspense: false,
    },
    false
  );

  const posts = await client!
    .query<PostsStaticPathsQuery, PostsStaticPathsQueryVariables>(
      PostsStaticPathsDocument
    )
    .toPromise();

  const paths =
    posts.data?.posts.map((i) => ({
      params: { slug: i.slug, username: i.user.username! },
    })) ?? [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (
  context
) => {
  const params = context.params;
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "https://flare.hasura.app/v1/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      suspense: false,
    },
    false
  );

  const res = await client!
    .query<GetPostBySlugQuery, GetPostBySlugQueryVariables>(
      GetPostBySlugDocument,
      {
        _eq: params!.slug as string,
      }
    )
    .toPromise();

  if (res.data && res.data.posts.length > 0) {
    if (res.data.posts[0].published || context.preview) {
      const headings = toc(res.data.posts[0].body_markdown, {
        maxdepth: 2,
      });

      return {
        props: {
          urqlState: ssrCache.extractData(),
          isPreview: context.preview ?? false,
          headings: headings.json,
        },

        revalidate: 60,
      };
    }
  }

  return {
    notFound: true,
  };
};

const Profile: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { isPreview, headings } = props;
  const router = useRouter();
  const [res] = useGetPostBySlugQuery({
    variables: {
      _eq: router.query.slug as string,
    },
  });

  if (res.data && res.data.posts.length > 0) {
    const post = res.data.posts[0];
    const stats = readingTime(post.body_markdown ?? "");
    return (
      <article className="bg-base pb-16">
        {isPreview && (
          <div className="flex items-center justify-center bg-gray-600 text-paper text-sm py-4">
            <FiPlay className="mr-2 h-5 w-5" />
            <span>Preview Mode</span>
          </div>
        )}
        <aside className="block sticky top-0 bg-paper border-t border-b z-50 lg:hidden">
          <Container size="wide">
            <div className="flex items-center justify-between h-14">
              <Link href={`/${post.user.username}`} passHref>
                <a className="flex items-center flex-1 min-w-0">
                  <span className="mr-2 flex-shrink-0">
                    <Avatar
                      src={post.user.image || undefined}
                      fallback={post.user.name}
                    />
                  </span>
                  <span className="text-sm font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {post.user.username}
                  </span>
                </a>
              </Link>
              {/* <div>
                <ToCDD headings={headings} />
              </div> */}
            </div>
          </Container>
        </aside>
        <header className="pt-10 pb-16">
          <Container size="wide">
            <div className="relative text-center space-y-6">
              <div className="text-7xl">
                <span>{post.emoji}</span>
              </div>
              <h1 className="text-2xl inline-block max-w-3xl">
                <span className="font-bold text-center">{post.title}</span>
              </h1>
              <div className="flex items-center justify-center text-sm text-gray-500 space-x-6">
                <div className="flex items-center space-x-1">
                  <span>
                    <FiCalendar className="h-4 w-4" />
                  </span>
                  <time dateTime={post.updated_at}>
                    {dayjs(post.updated_at).format("YYYY.MM.DD")}
                  </time>
                </div>
                <div className="flex items-center space-x-1">
                  <span>
                    <FiClock className="h-4 w-4" />
                  </span>
                  <span>{stats.text}</span>
                </div>
              </div>
            </div>
          </Container>
        </header>
        <Container
          size="wide"
          className="mx-0 px-0 sm:mx-auto sm:px-6 md:px-10"
        >
          <div className="block lg:flex lg:justify-between">
            <section className="w-full lg:w-[calc(100%-330px)]">
              <div className="py-8 rounded-none bg-paper sm:rounded-xl sm:shadow-md">
                <Container>
                  <div className="flex flex-none items-center overflow-x-auto mb-4">
                    {post.posts_tags.map((i) => (
                      <Link
                        key={i.tag.keyword}
                        passHref
                        href={`/tags/${i.tag.keyword}`}
                      >
                        <a className="border rounded-full flex items-center space-x-1 text-xs py-1 pl-1 pr-3">
                          <Image
                            alt=""
                            src={i.tag.image}
                            width={24}
                            height={24}
                          />
                          <span>{i.tag.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="prose">
                    {post.body_markdown && (
                      <Preview value={post.body_markdown} />
                    )}
                  </div>
                </Container>
              </div>
            </section>
            <aside className="hidden lg:block lg:w-[300px]">
              <div className="h-full">
                <div className="bg-paper rounded-xl pt-4 px-5 pb-6 shadow-md">
                  <div className="font-semibold">Tags</div>
                  <div className="flex flex-wrap justify-between">
                    {post.posts_tags.map((i) => (
                      <Link
                        key={i.tag.keyword}
                        passHref
                        href={`/tags/${i.tag.keyword}`}
                      >
                        <a className="flex space-x-1 items-center mt-3 flex-1 min-w-[49%]">
                          <Image
                            alt=""
                            src={i.tag.image}
                            width={24}
                            height={24}
                          />
                          <span>{i.tag.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="h-6" />
                <div className="sticky top-8 max-h-[calc(100vh-50px)] flex flex-col">
                  <div className="p-5 bg-paper rounded-xl shadow-md">
                    <div className="flex items-center justify-between">
                      <Link passHref href={`/${post.user.username}`}>
                        <a>
                          <Avatar
                            size="lg"
                            src={post.user.image || undefined}
                            fallback={post.user.name}
                          />
                        </a>
                      </Link>
                      <div className="w-[calc(100%-70px)]">
                        <Link passHref href={`/${post.user.name}`}>
                          <a className="block mt-1 font-semibold">
                            {post.user.name}
                          </a>
                        </Link>
                      </div>
                    </div>
                    <p className="mt-4 text-sm">{post.user.bio}</p>
                  </div>
                  <div className="h-6" />
                  <div className="p-5 bg-paper rounded-xl overflow-auto shadow-md">
                    <ToCDD headings={headings} />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>
    );
  } else {
    return (
      <div className="py-6">
        <ErrorMessage text={res.error?.message} />
      </div>
    );
  }
};

const withUrql: NextComponentTypeWithLayout = withUrqlClient(
  (ssr) => ({
    url: "https://flare.hasura.app/v1/graphql",
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(Profile);

withUrql.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default withUrql;
