import ArticleEditor from "@/components/Editor/ArticleEditor";
import { Fallback } from "@radix-ui/react-avatar";
import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/core";
import {
  GetPostByIdDocument,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  useGetPostByIdQuery,
} from "graphql/generated/graphql";
import { auth } from "initAdminApp";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import MinHeader from "ui/Layout/MinHeader";
import ErrorMessage from "ui/misc/ErrorMessage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get id
  const { id } = context.query;

  if (typeof id === "string") {
    // get user
    try {
      const { cookies } = context.req;
      // verified
      const user = await auth.verifyIdToken(cookies.token);
      //   init client
      const ssrCache = ssrExchange({ isClient: false });
      const client = initUrqlClient(
        {
          url: "https://flare.hasura.app/v1/graphql",
          exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
          suspense: false,
          fetchOptions: () => {
            return {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            };
          },
        },
        false
      );

      // fetch post
      const res = await client!
        .query<GetPostByIdQuery, GetPostByIdQueryVariables>(
          GetPostByIdDocument,
          {
            id,
          }
        )
        .toPromise();

      if (res.data) {
        if (res.data.posts_by_pk?.user_id === user.uid) {
          // is owner
          return {
            props: {
              urqlState: ssrCache.extractData(),
            },
          };
        } else {
          return {
            notFound: true,
          };
        }
      } else {
        return {
          notFound: true,
        };
      }
    } catch (error) {
      return {
        notFound: true,
      };
    }
  } else {
    //   throw error wrong format
    return {
      notFound: true,
    };
  }
};

const EditArticle: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const router = useRouter();
  const [res] = useGetPostByIdQuery({
    variables: {
      id: router.query.id as string,
    },
  });

  return (
    <div className="h-full flex flex-col">
      <MinHeader />
      <div className="bg-paper flex-grow">
        {res.fetching && <Fallback />}

        {res.error && <ErrorMessage text={res.error.message} />}

        {!res.fetching && !res.error && res.data && res.data.posts_by_pk && (
          <ArticleEditor
            id={res.data.posts_by_pk.id}
            body_markdown={res.data.posts_by_pk.body_markdown}
            emoji={res.data.posts_by_pk.emoji}
            published={res.data.posts_by_pk.published}
            tag_keyword={res.data.posts_by_pk.posts_tags.map((i) => ({
              label: i.tag_keyword,
              value: i.tag_keyword,
            }))}
            title={res.data.posts_by_pk.title}
          />
        )}
      </div>
    </div>
  );
};

export default withUrqlClient(
  (ssr) => ({
    url: "https://flare.hasura.app/v1/graphql",
  }),
  {
    ssr: false,
  }
)(EditArticle);
