import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Tag from "@/components/ArticleCard/Tag";
import Fallback from "@/components/Fallback/Fallback";
import Pagination from "@/components/Pagination/Pagination";
import { definitions } from "@/utils/generated";
import { queryParamToNumber } from "@/utils/query";
import { supabase } from "@/utils/supabaseClient";
import useSearchArticles from "hooks/supabase-hooks/search/useSearchArticles";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

interface SearchResultArticlesProps {
  param: string;
  count: number;
}

const itemsPerPage = 24;

const SearchResultArticles: React.FC<SearchResultArticlesProps> = ({
  param,
  count,
}) => {
  const router = useRouter();
  const page = queryParamToNumber(router.query.p, 1);
  const [tags, setTags] = useState<definitions["tags"][]>([]);

  const { data, isLoading } = useSearchArticles({
    param,
    page,
    itemsPerPage,
  });

  const searchTags = async (input: string) => {
    const res = await supabase
      .from<definitions["tags"]>("tags")
      .select("id, name, image_url")
      .ilike("name", `%${input}%`)
      .limit(5);

    if (res.data) {
      setTags(res.data);
    }
  };

  useEffect(() => {
    searchTags(param);
  }, [param]);

  const handleLinkBuild = (page: number) => {
    return `/search?param=${param}&p=${page}`;
  };

  // TODO error handling

  if (isLoading) {
    return <Fallback />;
  }

  if (data) {
    return (
      <div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((i) => (
              <Tag tag={i} key={i.id} />
            ))}
          </div>
        )}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {data.map((i) => (
              <ArticleCard key={i.id} article={i} emojiClass="gray-bg" />
            ))}
          </div>
        ) : (
          <p className="text-tMuted font-bold text-sm text-center">{`No search results for ${param} were found`}</p>
        )}

        {count > 0 && count > itemsPerPage && (
          <div className="my-4 text-center">
            <Pagination
              currentPage={page <= 0 ? 1 : page}
              itemsPerPage={itemsPerPage}
              totalCount={count}
              buildLink={handleLinkBuild}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default SearchResultArticles;
