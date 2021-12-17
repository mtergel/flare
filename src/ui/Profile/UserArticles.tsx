import ArticleCard from "ui/ArticleCard/ArticleCard";
import Button from "@/components/Button/Button";
import { themeColor } from "@/utils/const";
import { PostsJoins } from "@/utils/types";
import useInfiniteArticles from "hooks/supabase-hooks/articles/useInfiniteArticles";
import { Browser } from "react-kawaii";
import ErrorMessage from "ui/misc/ErrorMessage";

interface UserArticlesProps {
  userId: string;
  initialData: PostsJoins[];
}

const itemsPerPage = 24;

const UserArticles: React.FC<UserArticlesProps> = ({ userId, initialData }) => {
  const { isEmpty, data, isReachingEnd, isLoadingMore, setSize, error, size } =
    useInfiniteArticles(userId, itemsPerPage, initialData);

  if (isEmpty) {
    return (
      <div className="pt-8 flex flex-col items-center justify-center space-y-7">
        <Browser size={200} mood="shocked" color={themeColor} />
        <span className="text-tMuted text-lg">No articles published yet.</span>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data!.map((subset) =>
          subset.map((i) => <ArticleCard key={i.id} article={i} />)
        )}
      </div>

      {error && <ErrorMessage text={error.message} />}

      {!isReachingEnd && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={() => setSize(size + 1)}
            isLoading={isLoadingMore}
            disabled={isReachingEnd}
            variant="outline"
          >
            {isReachingEnd ? "No more articles." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserArticles;
