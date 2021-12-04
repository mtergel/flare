import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Button from "@/components/Button/Button";
import Fallback from "@/components/Fallback/Fallback";
import { themeColor } from "@/utils/const";
import { queryParamToNumber } from "@/utils/query";
import { PostsJoins } from "@/utils/types";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import useFetchArticlesByTag from "hooks/supabase-hooks/tags/useFetchArticlesByTag";
import { useRouter } from "next/dist/client/router";
import { Ghost } from "react-kawaii";

interface TagArticlesProps {
  tagId: string;
  initialData: PostsJoins[];
}

const itemsPerPage = 24;

const TagArticles: React.FC<TagArticlesProps> = ({ tagId, initialData }) => {
  const router = useRouter();
  const currentPage = queryParamToNumber(router.query.p, 1);
  const { data, isValidating } = useFetchArticlesByTag(
    tagId,
    currentPage <= 0 ? 1 : currentPage,
    itemsPerPage,
    true,
    initialData
  );

  const isEmpty = initialData.length === 0;

  if (isEmpty) {
    return (
      <div className="pt-8 flex flex-col items-center justify-center space-y-7">
        <Ghost size={200} mood="sad" color={themeColor} />
        <span className="text-tMuted text-lg">
          No articles published this tag yet.
        </span>
      </div>
    );
  }

  if (isValidating) {
    return (
      <div className="pt-16">
        <Fallback />
      </div>
    );
  }

  if (data) {
    if (data.length === 0) {
      return (
        <div className="pt-8 flex flex-col items-center justify-center space-y-7">
          <Ghost size={200} mood="ko" color={themeColor} />
          <span className="text-tMuted text-lg">No articles found.</span>
        </div>
      );
    }

    const handleNextPage = () => {
      router.push(`/tags/${router.query.tagId!}?p=${currentPage + 1}`);
    };

    const handlePrevPage = () => {
      if (currentPage <= 2) {
        router.push(`/tags/${router.query.tagId!}`);
      } else {
        router.push(`/tags/${router.query.tagId!}?p=${currentPage - 1}`);
      }
    };

    return (
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {data.map((i) => (
            <ArticleCard key={i.id} article={i} />
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 pt-6">
          {currentPage > 1 && (
            <Button
              onClick={handlePrevPage}
              size="sm"
              leftIcon={<FiChevronLeft />}
            >
              Previous
            </Button>
          )}
          <Button
            onClick={handleNextPage}
            color="primary"
            size="sm"
            rightIcon={<FiChevronRight />}
            isDisabled={data.length !== itemsPerPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default TagArticles;
