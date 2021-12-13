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
        children:post_comments(
          *,
          user:user_id (*),
          children_count:post_comments(count)
        )
      `
    )
    .eq("id", id)
    .single();

  if (error) {
    logger.debug(error);
    throw error;
  }

  logger.debug(data);
  return data ? (data as Comment).children : [];
};

const useFetchReplies = (parentId?: number) => {
  const { data, isValidating, mutate, error } = useSWR(
    () => (parentId ? [parentId, "__post_comment_replies"] : null),
    fetcher,
    {
      errorRetryCount: 1,
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

export default useFetchReplies;
