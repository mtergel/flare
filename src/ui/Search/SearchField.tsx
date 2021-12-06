import Input from "@/components/Input/Input";
import InputGroup from "@/components/InputGroup/InputGroup";
import InputRightIcon from "@/components/InputGroup/InputRightIcon";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import debounce from "debounce-promise";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useCallback } from "react";

interface SearchFieldProps {
  defaultValue?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ defaultValue }) => {
  const router = useRouter();

  const handleSearch = async (inputValue: string | undefined) => {
    if (inputValue) {
      await router.push(`/search?param=${inputValue}`);
    } else {
      await router.push(`/search`);
    }
  };

  // eslint-disable-next-line
  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.currentTarget.value);
  };

  return (
    <InputGroup>
      <Input
        defaultValue={defaultValue}
        type="text"
        placeholder="Enter a keyword"
        className="rounded-full pl-6 pr-14"
        onChange={handleInputChange}
        autoComplete="false"
        autoFocus
      />
      <InputRightIcon
        className="pr-6"
        aria-label="search"
        icon={<FiSearch />}
      />
    </InputGroup>
  );
};

export default SearchField;
