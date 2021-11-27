import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";
import logger from "@/utils/logger";
import { GetPostForEdit } from "@/utils/types";

const fetcher = async (id: number) => {
  const res = await supabase
    .from<definitions["posts"]>("posts")
    .select(
      `
      *,
      tags:post_tag (*)
      `
    )
    .eq("id", id)
    .single();

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);

  return res.data as GetPostForEdit;
};

const useGetArticle = (id: number) => {
  const { data, isValidating, mutate, error } = useSWR(
    () => (id > 0 ? [id, "__article"] : null),
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

export default useGetArticle;
