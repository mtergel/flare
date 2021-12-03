import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { PostsJoins } from "@/utils/types";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";

const fetcher = async (
  tagId: string,
  page: number,
  itemsPerPage: number,
  published?: boolean
) => {
  let filter = {
    "tags.id": tagId,
    post_type: "article",
  } as {
    [key: string]: any;
  };

  if (published !== undefined) {
    filter.published = published;
  }

  const res = await supabase
    .from<definitions["posts"]>("posts")
    .select(
      `
      id,
      title,
      emoji,
      post_type,
      reading_time,
      published,
      published_at,
      slug,
      user:user_id (
        username, display_name, avatar_url
      ),
      tags!inner(id)
      `
    )
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
    .match(filter)
    .order("published_at", { ascending: false });

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);

  return res.data as PostsJoins[];
};

/**
 * Use this hook in conjuction with pagination
 * @param {string}  tagId - Tag id.
 * @param {number} page - page (start from 1), uses from to param in hook
 * @param {number} itemsPerPage - number of items in a page
 * @param {boolean} published - Published filter leave undefined if you want all
 * @param {object} initialData - Initial data to hydrate the hook, will revalidate
 * @returns {object} Hook results with isLoading prop
 */
function useFetchArticlesByTag(
  tagId: string,
  page?: number,
  itemsPerPage?: number,
  published?: boolean,
  initialData?: PostsJoins[]
) {
  const { data, isValidating, mutate, error } = useSWR(
    [tagId, page ?? 1, itemsPerPage ?? 24, published, "__article"],
    fetcher,
    {
      errorRetryCount: 3,
      fallbackData: initialData,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isValidating,
    isLoading: !error && !data,
    mutate,
    error: error as PostgrestError,
  };
}

export default useFetchArticlesByTag;
