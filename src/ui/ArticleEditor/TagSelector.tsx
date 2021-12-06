import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { EditTag } from "@/utils/types";
import debounce from "debounce-promise";
import useFeaturedTags from "hooks/useFeaturedTags";
import { useCallback } from "react";
import AsyncCreatable from "react-select/async-creatable";

interface TagSelectorProps {
  value: EditTag[];
  onChange: (value: EditTag[]) => void;
}
const TagSelector: React.FC<TagSelectorProps> = ({ value, onChange }) => {
  const { fetching, options } = useFeaturedTags();

  const handleSearch = async (inputValue: string | undefined) => {
    if (inputValue) {
      const res = await supabase
        .from<definitions["tags"]>("tags")
        .select("id")
        .ilike("id", `%${inputValue}%`);

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
    value: i.id,
    label: i.id,
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
