import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { PostsJoins } from "@/utils/types";
import useSWRInfinite from "swr/infinite";

const fetcher = async (tagsId: string, page: number, itemsPerPage: number) => {
  const res = await supabase
    .from<definitions["posts"]>("posts")
    .select(
      `
        id,
        title,
        post_type,
        reading_time,
        published,
        published_at,
        user:user_id (
            username, display_name, avatar_url
        ),
        tags!inner(id)
        `
    )
    .range(page * itemsPerPage, (page + 1) * itemsPerPage - 1)
    .match({
      "tags.id": tagsId,
      post_type: "article",
      published: true,
    })
    .order("published_at", { ascending: false });

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);
  return (res.data as PostsJoins[]) ?? [];
};

/**
 * Use this hook in where pagination is not suitable
 * @param {string}  tagId - Tag id.
 * @param {number} itemsPerPage - number of items in a page
 * @param {object} initialData - Initial data [0] index to hydrate the hook, will revalidate
 * @returns {object} Hook results with additional indicator props
 */

function useInfiniteArticlesByTag(
  tagId: string,
  itemsPerPage: number,
  initialData?: PostsJoins[]
) {
  // array of arrays, size is the index
  const { data, size, setSize, error } = useSWRInfinite(
    (index, previousPageData) => {
      // this works when your at the last index and try to fetch more
      if (previousPageData && !previousPageData.length) return null;
      return [tagId, index, itemsPerPage];
    },
    fetcher,
    {
      fallbackData: initialData ? [initialData] : undefined,
      revalidateOnFocus: false,
    }
  );

  // indicators
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].length < itemsPerPage);

  return {
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    data,
    size,
    setSize,
    error,
  };
}

export default useInfiniteArticlesByTag;
