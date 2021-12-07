import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";

const fetcher = async (userId: string, postId: number) => {
  const res = await supabase
    .from<definitions["post_likes"]>("post_likes")
    .select(
      `
      *
      `,
      { count: "estimated" }
    )
    .match({
      user_id: userId,
      posts_id: postId,
    })
    .maybeSingle();

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);

  return res.data;
};

/**
 * Use this hook in conjuction with pagination
 * @param {string}  userId - User id.
 * @param {number} postId - page (start from 1), uses from to param in hook
 * @returns {object} Hook results with isLoading prop
 */
function usePostLiked(userId: string, postId?: number) {
  const { data, isValidating, mutate, error } = useSWR(
    [userId, postId, "__likes"],
    fetcher,
    {
      errorRetryCount: 3,
    }
  );

  const like = async () => {
    // no data and not validating
    if (!data && !isValidating) {
      // insert into table
      const res = await supabase
        .from<definitions["post_likes"]>("post_likes")
        .insert({
          posts_id: postId,
          user_id: userId,
        })
        .single();

      if (res.data) {
        await mutate(res.data);
      }
    }
  };

  const unlike = async () => {
    // data exists and not validating
    if (data && !isValidating) {
      // update into table
      await supabase
        .from<definitions["post_likes"]>("post_likes")
        .update({
          liked: false,
        })
        .eq("id", data.id);

      await mutate({
        ...data,
        liked: false,
      });
    }
  };

  return {
    data,
    isValidating,
    isLoading: !error && data === undefined, // null is valid now
    mutate,
    error: error as PostgrestError,
    like,
    unlike,
  };
}

export default usePostLiked;
