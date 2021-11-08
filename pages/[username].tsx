import Avatar from "@/components/Avatar/Avatar";
import Container from "@/components/Container/Container";
import {
  PublicGetUserByUsernameDocument,
  PublicGetUserByUsernameQuery,
  PublicGetUserByUsernameQueryVariables,
  usePublicGetUserByUsernameQuery,
} from "graphql/generated/graphql";
import { GetServerSideProps } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import ErrorMessage from "ui/misc/ErrorMessage";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { NextPageWithLayout } from "utils/types";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();

  const [res] = usePublicGetUserByUsernameQuery({
    variables: {
      _eq: router.query.username as string,
    },
  });

  if (res.data && res.data.users.length > 0) {
    const user = res.data.users[0];
    return (
      <>
        <header className="bg-paper">
          <Container size="common">
            <div className="py-12 pr-3">
              <div>
                <Avatar
                  size="profile"
                  src={user.image || undefined}
                  fallback={user.name[0]}
                />
                <div>
                  <h1 className="font-medium">{user.name}</h1>
                  <h2 className="text-gray-400 text-sm">@{user.username}</h2>
                </div>
              </div>
            </div>
          </Container>
        </header>
      </>
    );
  } else {
    return (
      <div className="py-6">
        <ErrorMessage text={res.error?.message} />
      </div>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  await client!
    .query<PublicGetUserByUsernameQuery, PublicGetUserByUsernameQueryVariables>(
      PublicGetUserByUsernameDocument,
      {
        _eq: params!.username as string,
      }
    )
    .toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(
  (ssr) => ({
    url: "https://flare.hasura.app/v1/graphql",
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(Profile);
