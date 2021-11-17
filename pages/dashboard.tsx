import Fallback from "@/components/Fallback/Fallback";
import { NextPageWithLayout, SideMenuItem } from "@/utils/types";
import { useAuth } from "context/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Layout from "ui/Layout/Layout";
import {
  useGetUserQuery,
  useListUsersPostsQuery,
} from "graphql/generated/graphql";
import ErrorMessage from "ui/misc/ErrorMessage";
import Link from "next/link";
import md5 from "md5";
import Container from "@/components/Container/Container";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const DashboardArticle: NextPageWithLayout = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }

    // eslint-disable-next-line
  }, [user, loading]);

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
          <div className="space-y-4 divide-y">
            {data.posts.map((post) => (
              <article key={post.id} className="pt-4 space-y-4">
                <div className="flex items-start justify-between">
                  {post.published ? (
                    <Link
                      href={`/${user.data?.users_by_pk?.username}/articles/${post.slug}`}
                      passHref
                    >
                      <a className="font-semibold text-lg">{post.title}</a>
                    </Link>
                  ) : (
                    <Link
                      href={`/api/preview?slug=${post.slug}&preview=${md5(
                        post.slug + process.env.NEXT_PUBLIC_SALT
                      )}`}
                      passHref
                    >
                      <a className="font-semibold text-lg">{post.title}</a>
                    </Link>
                  )}
                </div>
                <footer className="text-xs flex items-center flex-wrap gap-2 text-gray-500">
                  <div className="border rounded py-1 px-2">
                    {post.published ? "Published" : "Draft"}
                  </div>
                  <time>{dayjs(post.updated_at).fromNow()}</time>
                </footer>
              </article>
            ))}
          </div>
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
