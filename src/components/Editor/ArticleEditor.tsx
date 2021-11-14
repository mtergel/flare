import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import Switch from "@/components/Switch/Switch";
import { getRandomEmoji } from "@/utils/const";
import dayjs from "dayjs";
import "emoji-mart/css/emoji-mart.css";
import {
  SearchTagsByKeywordDocument,
  SearchTagsByKeywordQuery,
  useListTagsForSelectQuery,
} from "graphql/generated/graphql";
import useLocalStorage from "hooks/useLocalStorage";
import { useCallback, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AsyncCreatable from "react-select/async-creatable";
import { useClient } from "urql";
import EmojiPicker from "./EmojiPicker";
import debounce from "debounce-promise";
import { EditTag } from "@/utils/types";

interface ArticleEditorProps {
  id?: string | null;
  title?: string | null;
  body_markdown?: string | null;
  published?: boolean | null;
  emoji?: string | null;
  tag_keyword?: EditTag[];
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  id,
  title,
  body_markdown,
  published,
  emoji,
  tag_keyword,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      id,
      title,
      body_markdown: body_markdown ?? "",
      published,
      emoji: emoji ?? getRandomEmoji(),
      tag_keyword: tag_keyword ?? [],
    },
  });

  const {} = useFieldArray({
    control,
    name: "tag_keyword",
  });

  const onSubmit = async (data: {
    id?: string | null;
    title: string;
    body_markdown: string;
    published: boolean;
    tag_keyword: EditTag[];
  }) => {
    console.log(data);
    if (data.title) {
      // just proceed normal
      if (data.id) {
        // const res =await update()
      } else {
        // const res = await create();
      }
    } else {
      if (!data.title) {
        toast.error("An title is required.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-20">
      <Container size="small">
        <textarea
          placeholder="Title"
          maxLength={70}
          spellCheck={false}
          autoFocus
          rows={1}
          className="editor-title"
          {...register("title")}
        />
        <div className="md:border md:rounded-md md:overflow-hidden">
          <Controller
            control={control}
            name="body_markdown"
            render={({ field }) => (
              <Editor markdown={field.value} onChange={field.onChange} />
            )}
          />
          <div className="m-2 space-y-2">
            <Controller
              control={control}
              name="emoji"
              render={({ field }) => (
                <EmojiPicker value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              control={control}
              name="tag_keyword"
              render={({ field }) => (
                <TagSelector value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
          <div className="flex items-center space-x-6 justify-end mx-2 mb-2">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="published"
                className="text-sm font-semibold text-gray-500"
              >
                Publish
              </label>
              <Controller
                control={control}
                name="published"
                render={({ field }) => (
                  <Switch
                    id="published"
                    name={field.name}
                    ref={field.ref}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              color="primary"
              disabled={!isDirty}
              isLoading={isSubmitting}
            >
              {isDirty ? "Save" : "Saved"}
            </Button>
          </div>
        </div>
      </Container>
    </form>
  );
};

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
        onChange={(newValue) => {
          onChange(newValue as []);
        }}
      />
    </div>
  );
};

export default ArticleEditor;
