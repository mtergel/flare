import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import IconButton from "@/components/IconButton/IconButton";
import { NextPageWithLayout } from "@/utils/types";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  useGetUserQuery,
  useListUsersPostsQuery,
} from "graphql/generated/graphql";
import useProtected from "hooks/useProtected";
import md5 from "md5";
import Link from "next/link";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";

dayjs.extend(relativeTime);

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
          <div className="space-y-4 divide-y">
            {data.posts.map((post) => (
              <article key={post.id} className="pt-4">
                <div className="flex items-start justify-between">
                  <Link href={`/articles/${post.id}/edit`} passHref>
                    <a className="font-semibold text-lg line-clamp-2 pr-6">
                      {post.title}
                    </a>
                  </Link>
                  <div className="space-x-3 flex-shrink-0">
                    {post.published ? (
                      <Link
                        href={`/${user.data?.users_by_pk?.username}/articles/${post.slug}`}
                        passHref
                      >
                        <IconButton
                          as="a"
                          aria-label="view"
                          icon={<FiPlay />}
                          variant="outline"
                        />
                      </Link>
                    ) : (
                      <IconButton
                        as="a"
                        // @ts-ignore // how to add this to typescript
                        href={`/api/preview?slug=${post.slug}&preview=${md5(
                          post.slug + process.env.NEXT_PUBLIC_SALT
                        )}`}
                        aria-label="preview"
                        icon={<FiPlay />}
                        variant="outline"
                      />
                    )}
                    <Link href={`/articles/${post.id}/edit`} passHref>
                      <IconButton
                        as="a"
                        aria-label="edit"
                        icon={<FiEdit2 />}
                        variant="outline"
                      />
                    </Link>
                  </div>
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
