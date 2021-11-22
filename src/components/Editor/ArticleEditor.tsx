import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import Switch from "@/components/Switch/Switch";
import { getRandomEmoji } from "@/utils/const";
import postid from "@/utils/postid";
import { EditTag } from "@/utils/types";
import "emoji-mart/css/emoji-mart.css";
import {
  Posts_Tags_Constraint,
  Posts_Tags_Insert_Input,
  Post_Type_Enum,
  useCreatePostMutation,
  useDeletePostsTagsMutation,
  useInsertPostsTagsMutation,
  useInsertTagsMutation,
  useUpdatePostMutation,
} from "graphql/generated/graphql";
import compact from "lodash/compact";
import keyBy from "lodash/keyBy";
import md5 from "md5";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";
import logger from "utils/logger";
import EmojiPicker from "./EmojiPicker";

const TagSelector = dynamic(() => import("./TagSelector"), {
  ssr: false,
});

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
  // textarea hooks
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const [_tags, insertTags] = useInsertTagsMutation();
  const [_post, createPost] = useCreatePostMutation();
  const [_updateRes, updatePost] = useUpdatePostMutation();
  const [_insertRes, insertPostsTags] = useInsertPostsTagsMutation();
  const [_deleteRes, deletePostsTags] = useDeletePostsTagsMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    setError,
    reset,
    watch,
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

  const onSubmit = async (data: {
    id?: string | null;
    title: string;
    body_markdown: string;
    published: boolean;
    emoji: string;
    tag_keyword: EditTag[];
  }) => {
    if (data.title && data.tag_keyword.length <= 4) {
      // check for new tags
      // by creating it beforehand
      // we dont need permission to upsert (tags)(user)
      const newTags = data.tag_keyword
        .filter((i) => i.__isNew__)
        .map((i) => ({
          keyword: i.value,
        }));
      // create new tags
      if (newTags.length > 0) {
        await insertTags({
          objects: newTags,
        });
      }

      if (data.id) {
        try {
          const postTags = keyBy(tag_keyword, "value");
          let toAdd: Posts_Tags_Insert_Input[] = [];
          data.tag_keyword.forEach((tag) => {
            // check if postTags have been added
            if (!postTags.hasOwnProperty(tag.value)) {
              // not in initial values
              // so must be added
              toAdd.push({
                post_id: data.id,
                tag_keyword: tag.value,
              });
            } else {
              // already exists
              delete postTags[tag.value];
            }
          });

          // check if tags have been removed
          const toRemovePostTags = compact(
            Object.values(postTags).map((i) => i.id)
          );

          await insertPostsTags({
            objects: toAdd,
            on_conflict: {
              constraint: Posts_Tags_Constraint.PostsTablePkey,
              update_columns: [],
            },
          });
          await deletePostsTags({
            where: {
              id: {
                _in: toRemovePostTags,
              },
            },
          });

          const updatePostRes = await updatePost({
            id: data.id,
            _set: {
              title: data.title,
              emoji: data.emoji,
              body_markdown: data.body_markdown,
              published: data.published,
            },
          });
          if (updatePostRes.data && updatePostRes.data.update_posts_by_pk) {
            const updatedPost = updatePostRes.data.update_posts_by_pk;
            reset({
              id: updatedPost.id,
              title: updatedPost.title,
              body_markdown: updatedPost.body_markdown ?? "",
              emoji: updatedPost.emoji ?? getRandomEmoji(),
              published: updatedPost.published,
              tag_keyword: updatedPost.posts_tags.map((tag) => ({
                id: tag.id,
                label: tag.tag_keyword,
                value: tag.tag_keyword,
              })),
            });
            toast.success("Saved!");
          }
        } catch (error) {
          logger.debug(error);
        }
      } else {
        try {
          // create post
          const slug =
            slugify(data.title, {
              lower: true,
              strict: true,
            }) + `-${postid()}`;

          const postRes = await createPost({
            object: {
              body_markdown: data.body_markdown,
              emoji: data.emoji,
              published: data.published,
              post_type: Post_Type_Enum.Article,
              title: data.title,
              slug: slug,
              posts_tags: {
                data: data.tag_keyword.map((j) => ({
                  tag_keyword: j.label,
                })),
              },
            },
          });

          if (postRes.data && postRes.data.insert_posts_one) {
            const createdPost = postRes.data.insert_posts_one;
            if (data.published) {
              // just redirect to new created post
              router.push(
                `${createdPost.user.username}/articles/${createdPost.slug}`
              );
            } else {
              // try creating preview
              try {
                const hashValue = md5(
                  createdPost.slug + process.env.NEXT_PUBLIC_SALT
                );

                // this will redirect to successful
                await fetch(
                  `/api/preview?slug=${createdPost.slug}&preview=${hashValue}`,
                  {
                    redirect: "follow",
                  }
                );
              } catch (error) {
                logger.debug(error);
                toast.error(
                  "Error occured when trying to generate preview url."
                );
                router.push("/dashboard");
              }
            }
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else {
      if (!data.title) {
        toast.error("An title is required.");
        setError("title", {
          type: "required",
          message: "A title is required",
        });
      } else {
        toast.error("Exceeds the maximum of 4 tags.");
        setError("tag_keyword", {
          type: "maxLength",
          message: "Exceeds the maximum of 4 tags",
        });
      }
    }
  };

  const { ref, ...rest } = register("title", {
    disabled: isSubmitting,
  });
  const watchedTextArea = watch("title");

  // don't know if this is performant?
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [watchedTextArea]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-20">
      <Container size="common">
        <textarea
          placeholder="Title"
          maxLength={70}
          spellCheck={false}
          autoFocus
          rows={1}
          className="editor-title overflow-y-hidden"
          {...rest}
          ref={(e) => {
            ref(e);
            // @ts-ignore
            textAreaRef.current = e;
          }}
        />
        <div className="pb-6 space-y-2">
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
        <div className="md:border md:rounded-md md:overflow-hidden">
          <Controller
            control={control}
            name="body_markdown"
            render={({ field }) => (
              <Editor markdown={field.value} onChange={field.onChange} />
            )}
          />
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
                    disabled={isSubmitting}
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

export default ArticleEditor;
