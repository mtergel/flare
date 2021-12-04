import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import dayjs from "dayjs";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect, useState } from "react";

const today = dayjs();

const useFeaturedTags = () => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useLocalStorage("AUTOCOMPLETE", {
    items: [] as definitions["tags"][],
    timestamp: Date.now(),
  });

  const savedTime = dayjs(options.timestamp);
  const fetchTags = async () => {
    setFetching(true);

    const res = await supabase
      .from<definitions["tags"]>("tags")
      .select(`id, name, image_url`)
      .eq("featured", true);

    if (res.data) {
      setOptions({
        items: res.data,
        timestamp: Date.now(),
      });
    }

    if (res.error) {
      logger.debug(res.error);
    }

    setFetching(false);
  };

  useEffect(() => {
    if (options.items.length === 0) {
      fetchTags();
    } else if (today.subtract(3, "day") > savedTime) {
      fetchTags();
    }

    // eslint-disable-next-line
  }, []);

  return { options, fetching };
};

export default useFeaturedTags;
