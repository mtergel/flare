import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";
import logger from "@/utils/logger";
import { PostsJoins } from "@/utils/types";

const fetcher = async (id: number) => {
  const res = await supabase
    .from<definitions["posts"]>("posts")
    .select(
      `
      *,
      tags:post_tag (*),
      user:user_id (*)
      `
    )
    .eq("id", id)
    .single();

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);

  return res.data as PostsJoins;
};

/**
 *
 * @param id - Post id number
 * @param initialData  - initial fallback data
 * @returns swr hook results
 */
const useGetPost = (id: number, initialData?: PostsJoins) => {
  const { data, isValidating, mutate, error } = useSWR(
    () => (id > 0 ? [id, "__post"] : null),
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
};

export default useGetPost;
