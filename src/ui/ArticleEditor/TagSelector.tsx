import { EditTag } from "@/utils/types";
import dayjs from "dayjs";
import debounce from "debounce-promise";
import {
  SearchTagsByKeywordDocument,
  SearchTagsByKeywordQuery,
  useListTagsForSelectQuery,
} from "graphql/generated/graphql";
import useLocalStorage from "hooks/useLocalStorage";
import { useCallback, useEffect } from "react";
import AsyncCreatable from "react-select/async-creatable";
import { useClient } from "urql";

interface TagSelectorProps {
  value: EditTag[];
  onChange: (value: EditTag[]) => void;
}
const TagSelector: React.FC<TagSelectorProps> = ({ value, onChange }) => {
  const client = useClient();
  const handleSearch = async (inputValue: string | undefined) => {
    if (inputValue) {
      try {
        const res = await client
          .query(SearchTagsByKeywordDocument, {
            search: inputValue,
          })
          .toPromise();
        return (
          res.data as SearchTagsByKeywordQuery
        ).search_tags_by_keyword.map((i) => ({
          value: i.keyword,
          label: i.keyword,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // eslint-disable-next-line
  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const [options, setOptions] = useLocalStorage("AUTOCOMPLETE", {
    items: [],
    timestamp: Date.now(),
  });

  const [res] = useListTagsForSelectQuery({
    pause: options.items.length !== 0,
  });

  const d1 = dayjs(options.timestamp);
  const today = dayjs();

  useEffect(() => {
    if (today.subtract(3, "day") > d1) {
      setOptions({
        items: [],
      });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (res.data) {
      setOptions({
        items: res.data.tags.map((i) => i.keyword),
        timestamp: Date.now(),
      });
    }

    // eslint-disable-next-line
  }, [res.data]);

  const _options = options.items.map((i: string) => ({
    value: i,
    label: i,
  }));

  return (
    <div className="tag-field">
      <AsyncCreatable
        value={value}
        isMulti
        placeholder="Select tags"
        isDisabled={res.fetching || !!res.error}
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
