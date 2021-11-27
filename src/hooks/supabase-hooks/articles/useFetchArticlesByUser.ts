import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";
import logger from "@/utils/logger";
import { PostsJoins } from "@/utils/types";

const fetcher = async (userId: string, page: number, itemsPerPage: number) => {
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
    .match({
      user_id: userId,
      post_type: "article",
    })
    .order("created_at", { ascending: true });

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

const useFetchArticlesByUser = (
  userId: string,
  page?: number,
  itemsPerPage?: number
) => {
  const { data, isValidating, mutate, error } = useSWR(
    [userId, page ?? 1, itemsPerPage ?? 24, "__article"],
    fetcher,
    {
      errorRetryCount: 3,
    }
  );

  return {
    data,
    isValidating,
    isLoading: !error && !data,
    mutate,
    error: error as PostgrestError,
  };
};

export default useFetchArticlesByUser;
