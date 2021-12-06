import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import Pagination from "@/components/Pagination/Pagination";
import { themeColor } from "@/utils/const";
import { queryParamToNumber } from "@/utils/query";
import { NextPageWithLayout } from "@/utils/types";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { useAuth } from "context/auth";
import useFetchArticlesByUser from "hooks/supabase-hooks/articles/useFetchArticlesByUser";
import remove from "lodash/remove";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { Folder } from "react-kawaii";
import ArticleRow from "ui/Dashboard/ArticleRow";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";

const DashboardArticle: NextPageWithLayout = () => {
  const { user } = useAuth();

  if (user) {
    if (user.username) {
      return <Dashboard userId={user.id} username={user.username} />;
    } else {
      return <ErrorMessage text="You don't have a profile setup" />;
    }
  }

  return null;
};

interface DashboardProps {
  userId: string;
  username: string;
}

const itemsPerPage = 10;

const Dashboard: React.FC<DashboardProps> = ({ userId, username }) => {
  const router = useRouter();
  const currentPage = queryParamToNumber(router.query.p, 1);
  const { data, isLoading, error, mutate } = useFetchArticlesByUser(
    userId,
    currentPage <= 0 ? 1 : currentPage,
    itemsPerPage
  );

  const handleLinkBuild = (page: number) => {
    return `/user/dashboard?p=${page}`;
  };

  const handleDeleteMutation = (id: number) => {
    if (data) {
      remove(data.articles, (article) => article.id === id);

      mutate({
        articles: data.articles,
        count: data.count - 1,
      });
    }
  };

  if (isLoading) {
    return <Fallback />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  if (data) {
    return (
      <div className="h-full border-t bg-paper">
        <Container size="wide" className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-bold text-4xl">Articles</h1>
            <Link href="/user/new" passHref>
              <Button
                className="sm:hidden"
                color="primary"
                size="sm"
                leftIcon={<FiPlus />}
                as="a"
              >
                Add new
              </Button>
            </Link>
          </div>
          {data.articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-8 pt-4">
              <div className="font-semibold text-lg text-tMuted text-center">
                <p>You don&apos;t have any articles</p>
                <p>Let&apos;s create one!</p>
              </div>
              <Folder mood="excited" color={themeColor} />
              <Link href="/user/new" passHref>
                <Button as="a" color="primary">
                  Create
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="space-y-4 divide-y">
                {data.articles.map((article) => (
                  <ArticleRow
                    key={article.id}
                    article={article}
                    username={username}
                    onDeleteMutation={handleDeleteMutation}
                  />
                ))}
              </div>
              {data.count && data.count > itemsPerPage && (
                <div className="my-4 text-center">
                  <Pagination
                    currentPage={currentPage <= 0 ? 1 : currentPage}
                    itemsPerPage={itemsPerPage}
                    totalCount={data.count}
                    buildLink={handleLinkBuild}
                  />
                </div>
              )}
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
