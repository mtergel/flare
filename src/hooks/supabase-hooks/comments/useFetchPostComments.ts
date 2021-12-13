import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { Comment } from "@/utils/types";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";

const fetcher = async (id: number) => {
  const { data, error } = await supabase
    .from<definitions["post_comments"]>("post_comments")
    .select(
      `
        *,
        user:user_id (*)
      `
    )
    .is("parent_comment_id", null)
    .eq("posts_id", id);

  if (error) {
    logger.debug(error);
    throw error;
  }

  logger.debug(data);
  return (data as Comment[]) ?? [];
};

const useFetchPostComments = (id: number) => {
  const { data, isValidating, mutate, error } = useSWR(
    () => (id > 0 ? [id, "__post_comments"] : null),
    fetcher,
    {
      errorRetryCount: 3,
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

export default useFetchPostComments;
