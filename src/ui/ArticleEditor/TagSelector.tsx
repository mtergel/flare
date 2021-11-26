import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { EditTag } from "@/utils/types";
import dayjs from "dayjs";
import debounce from "debounce-promise";
import { useCallback, useEffect, useState } from "react";
import AsyncCreatable from "react-select/async-creatable";
import logger from "@/utils/logger";
import useLocalStorage from "hooks/useLocalStorage";

const today = dayjs();

interface TagSelectorProps {
  value: EditTag[];
  onChange: (value: EditTag[]) => void;
}
const TagSelector: React.FC<TagSelectorProps> = ({ value, onChange }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useLocalStorage("AUTOCOMPLETE", {
    items: [] as string[],
    timestamp: Date.now(),
  });

  const savedTime = dayjs(options.timestamp);
  const fetchTags = async () => {
    setFetching(true);

    const res = await supabase
      .from<definitions["tags"]>("tags")
      .select(`id`)
      .eq("featured", true);

    if (res.data) {
      setOptions({
        items: res.data.map((i) => i.id),
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

  const handleSearch = async (inputValue: string | undefined) => {
    if (inputValue) {
      const res = await supabase
        .from<definitions["tags"]>("tags")
        .select("id")
        .textSearch("id", `${inputValue}`, {
          config: "english",
        });

      if (res.data) {
        return res.data.map((i) => ({
          value: i.id,
          label: i.id,
        }));
      } else {
        return [];
      }
    }
  };

  // eslint-disable-next-line
  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const _options = options.items.map((i) => ({
    value: i,
    label: i,
  }));

  return (
    <div className="tag-field">
      <AsyncCreatable
        value={value}
        isMulti
        placeholder="Add up to 4 tags..."
        isDisabled={fetching}
        classNamePrefix="rs"
        formatCreateLabel={(inputValue) => inputValue}
        cacheOptions
        defaultOptions={_options}
        loadOptions={debouncedSearch}
        closeMenuOnSelect={false}
        menuPortalTarget={document.body}
        onChange={(newValue) => {
          onChange(newValue as []);
        }}
      />
    </div>
  );
};

export default TagSelector;
