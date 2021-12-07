import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (userId: string, postId: number) => {
  const res = await supabase
    .from<definitions["post_likes"]>("post_likes")
    .select(
      `
      *
      `
    )
    .match({
      user_id: userId,
      posts_id: postId,
    })
    .maybeSingle();

  if (res.error) {
    logger.debug(res.error);
    if (
      res.error.details ===
      "Results contain 0 rows, application/vnd.pgrst.object+json requires 1 row"
    ) {
      return null;
    } else {
      throw res.error;
    }
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
      revalidateOnFocus: false,
    }
  );

  const [loading, setLoading] = useState(false);

  const like = async () => {
    if (!data) {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const unlike = async () => {
    if (data) {
      setLoading(true);

      await supabase
        .from<definitions["post_likes"]>("post_likes")
        .delete()
        .eq("id", data.id);

      await mutate(null);
      setLoading(false);
    }
  };

  return {
    data,
    isValidating,
    isLoading: (!error && data === undefined) || loading, // null is valid now
    mutate,
    error: error as PostgrestError,
    like,
    unlike,
  };
}

export default usePostLiked;
