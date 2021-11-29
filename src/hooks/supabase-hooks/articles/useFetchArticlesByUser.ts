import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { PostsJoins } from "@/utils/types";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";

const fetcher = async (
  userId: string,
  page: number,
  itemsPerPage: number,
  published?: boolean
) => {
  let filter = {
    user_id: userId,
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
      *,
      tags!post_tag (*),
      user:user_id (*)
      `,
      { count: "estimated" }
    )
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
    .match(filter)
    .order("created_at", { ascending: false });

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);

  return {
    articles: res.data as PostsJoins[],
    count: res.count ?? 0,
  };
};

/**
 * Use this hook in conjuction with pagination
 * @param {string}  userId - User id.
 * @param {number} page - page (start from 1), uses from to param in hook
 * @param {number} itemsPerPage - number of items in a page
 * @param {boolean} published - Published filter leave undefined if you want all
 * @param {object} initialData - Initial data to hydrate the hook, will revalidate
 * @returns {object} Hook results with isLoading prop
 */
function useFetchArticlesByUser(
  userId: string,
  page?: number,
  itemsPerPage?: number,
  published?: boolean,
  initialData?: {
    articles: PostsJoins[];
    count: number;
  }
) {
  const { data, isValidating, mutate, error } = useSWR(
    [userId, page ?? 1, itemsPerPage ?? 24, published, "__article"],
    fetcher,
    {
      errorRetryCount: 3,
      fallbackData: initialData,
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

export default useFetchArticlesByUser;
