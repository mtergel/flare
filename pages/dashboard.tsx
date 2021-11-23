import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import { themeColor } from "@/utils/const";
import { NextPageWithLayout } from "@/utils/types";
import {
  useGetUserQuery,
  useListUsersPostsQuery,
} from "graphql/generated/graphql";
import useProtected from "hooks/useProtected";
import Link from "next/link";
import { Folder } from "react-kawaii";
import ArticleRow from "ui/Dashboard/ArticleRow";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";

const DashboardArticle: NextPageWithLayout = () => {
  const { user } = useProtected();

  if (user) {
    return <Dashboard userId={user.uid} />;
  } else {
    return <Fallback />;
  }
};

interface DashboardProps {
  userId: string;
}

// TODO ADD PAGINATION HERE
const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [user] = useGetUserQuery({
    variables: {
      user_id: userId,
    },
  });
  const [{ fetching, data, error }] = useListUsersPostsQuery({
    variables: {
      _eq: userId,
    },
  });
  if (fetching) {
    return <Fallback />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  if (data) {
    return (
      <div className="h-full border-t bg-paper">
        <Container size="wide" className="my-6">
          <div className="mb-4">
            <h1 className="font-bold text-4xl">Articles</h1>
          </div>
          {data.posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-8 pt-4">
              <div className="font-semibold text-lg text-gray-500 text-center">
                <p>You don&apos;t have any articles</p>
                <p>Let&apos;s create one!</p>
              </div>
              <Folder mood="excited" color={themeColor} />
              <Link href="/new" passHref>
                <Button as="a" color="primary">
                  Create
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 divide-y">
              {user.fetching && <Fallback />}
              {user.data &&
                user.data.users_by_pk &&
                data.posts.map((post) => (
                  <ArticleRow
                    key={post.id}
                    post={post}
                    username={user.data?.users_by_pk?.username!}
                  />
                ))}
            </div>
          )}
        </Container>
      </div>
    );
  }

  return null;
};

DashboardArticle.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DashboardArticle;
