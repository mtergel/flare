import { supabase } from "@/utils/supabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";
import useSWR from "swr";
import logger from "@/utils/logger";
import { definitions } from "@/utils/generated";

interface searchProps {
  param: string;
  page: number;
  itemsPerPage: number;
}

const fetcher = async (input: searchProps) => {
  const { param, page, itemsPerPage } = input;
  const res = await supabase
    .from<definitions["profiles"]>("profiles")
    .select(
      `
      id,
      username,
      display_name,
      avatar_url
      `
    )
    .textSearch("username", `'${param}'`)
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

  if (res.error) {
    logger.debug(res.error);
    throw res.error;
  }

  logger.debug(res);

  return res.data;
};

const useSearchUsers = (input: searchProps) => {
  const { data, isValidating, error, mutate } = useSWR(
    [input.param, input.page, input.itemsPerPage, "__useSearchUsers"],
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

export default useSearchUsers;
