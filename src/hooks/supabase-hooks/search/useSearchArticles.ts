import { supabase } from "@/utils/supabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";
import logger from "@/utils/logger";
import { definitions } from "@/utils/generated";
import { PostsJoins } from "@/utils/types";

interface searchProps {
  param: string;
  page: number;
  itemsPerPage: number;
}

const fetcher = async (input: searchProps) => {
  const { param, page, itemsPerPage } = input;
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
      )
      `
    )
    .match({
      published: true,
      post_type: "article",
    })
    .textSearch("title", `'${param}'`)
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);

  return res.data as PostsJoins[];
};

const useSearchArticles = (input: searchProps) => {
  const { data, isValidating, error, mutate } = useSWR(
    [input.param, input.page, input.itemsPerPage, "__useSearchArticles"],
    () => fetcher({ ...input }),
    {
      errorRetryCount: 0,
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
};

export default useSearchArticles;
