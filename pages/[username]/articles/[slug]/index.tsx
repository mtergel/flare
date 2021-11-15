import Avatar from "@/components/Avatar/Avatar";
import Container from "@/components/Container/Container";
import IconButton from "@/components/IconButton/IconButton";
import {
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
  PostsStaticPathsDocument,
  PostsStaticPathsQuery,
  PostsStaticPathsQueryVariables,
  useGetPostBySlugQuery,
} from "graphql/generated/graphql";
import { GetStaticPaths, GetStaticProps } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { NextComponentTypeWithLayout, NextPageWithLayout } from "utils/types";
import { FiList } from "@react-icons/all-files/fi/FiList";
import Preview from "@/components/Editor/Preview";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const [res] = useGetPostBySlugQuery({
    variables: {
      _eq: router.query.slug as string,
    },
  });

  if (res.data && res.data.posts.length > 0) {
    const post = res.data.posts[0];
    return (
      <article className="bg-base pb-16">
        <aside className="block sticky top-0 bg-paper border-t border-b z-50">
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
              <div>
                <IconButton
                  variant="ghost"
                  aria-label="table of content"
                  icon={<FiList />}
                />
              </div>
            </div>
          </Container>
        </aside>
        <header className="pt-10 pb-16">
          <Container size="wide">
            <div className="relative text-center">
              <div className="text-7xl my-6">
                <span>{post.emoji}</span>
              </div>
              <h1 className="text-2xl inline-block text-left max-w-3xl">
                <span className="font-bold">{post.title}</span>
              </h1>
            </div>
          </Container>
        </header>
        <Container size="wide" className="mx-0 px-0">
          <div className="block">
            <section className="w-full">
              <div className="py-8 rounded-none bg-paper">
                <Container>
                  <div className="prose">
                    {post.body_markdown && (
                      <Preview value={post.body_markdown} />
                    )}
                  </div>
                </Container>
              </div>
            </section>
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

export const getStaticProps: GetStaticProps = async (context) => {
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

  if (res.data && res.data.posts.length > 0 && !res.data.posts[0].published) {
    // not published

    if (!context.preview) {
      // not published and not owner
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
      isPreview: context.preview ?? false,
    },

    revalidate: 60,
  };
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
