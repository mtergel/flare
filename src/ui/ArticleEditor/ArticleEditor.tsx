import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import Input from "@/components/Input/Input";
import Switch from "@/components/Switch/Switch";
import { getRandomEmoji } from "@/utils/const";
import copyToClipboard from "@/utils/copyToClipboard";
import { definitions } from "@/utils/generated";
import { postid } from "@/utils/ids";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { EditTag } from "@/utils/types";
import { FiCopy } from "@react-icons/all-files/fi/FiCopy";
import { useAuth } from "context/auth";
import "emoji-mart/css/emoji-mart.css";
import compact from "lodash/compact";
import keyBy from "lodash/keyBy";
import md5 from "md5";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";
import EmojiPicker from "ui/ArticleEditor/EmojiPicker";
import ArticleImageUpload from "./ArticleImageUpload";
import SavedToast from "./SavedToast";

const TagSelector = dynamic(() => import("ui/ArticleEditor/TagSelector"), {
  ssr: false,
});

interface ArticleEditorProps {
  id?: string | null;
  title?: string | null;
  body_markdown?: string | null;
  published?: boolean | null;
  emoji?: string | null;
  tag_keyword?: EditTag[];
  user_id: string;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  id,
  title,
  body_markdown,
  published,
  emoji,
  tag_keyword,
  user_id,
}) => {
  // textarea hooks
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    setError,
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      id,
      title,
      body_markdown: body_markdown ?? "",
      published,
      emoji: emoji ?? getRandomEmoji(),
      tag_keyword: tag_keyword ?? [],
      user_id,
    },
  });

  const onSubmit = async (data: {
    id?: string | null;
    title: string;
    body_markdown: string;
    published: boolean;
    emoji: string;
    tag_keyword: EditTag[];
    user_id: string;
  }) => {
    if (data.title && data.tag_keyword.length <= 4) {
      // check for new tags
      // by creating it beforehand
      // we dont need permission to upsert (tags)(user)
      const newTags = data.tag_keyword
        .filter((i) => i.__isNew__)
        .map((i) => ({
          id: i.value,
          name: i.value.charAt(0).toUpperCase() + i.value.slice(1),
        }));
      // create new tags
      if (newTags.length > 0) {
        setLoadingText("Creating tags");
        await supabase.from<definitions["tags"]>("tags").insert(newTags);
      }

      if (data.id) {
        console.warn("Update method");
        // update method
        // try {
        //   const postTags = keyBy(tag_keyword, "value");
        //   let toAdd: any[] = [];
        //   data.tag_keyword.forEach((tag) => {
        //     // check if postTags have been added
        //     if (!postTags.hasOwnProperty(tag.value)) {
        //       // not in initial values
        //       // so must be added
        //       toAdd.push({
        //         post_id: data.id,
        //         tag_keyword: tag.value,
        //       });
        //     } else {
        //       // already exists
        //       delete postTags[tag.value];
        //     }
        //   });

        //   // check if tags have been removed
        //   const toRemovePostTags = compact(
        //     Object.values(postTags).map((i) => i.id)
        //   );

        //   await insertPostsTags({
        //     objects: toAdd,
        //     on_conflict: {
        //       constraint: Posts_Tags_Constraint.PostsTablePkey,
        //       update_columns: [],
        //     },
        //   });
        //   await deletePostsTags({
        //     where: {
        //       id: {
        //         _in: toRemovePostTags,
        //       },
        //     },
        //   });

        //   const updatePostRes = await updatePost({
        //     id: data.id,
        //     _set: {
        //       title: data.title,
        //       emoji: data.emoji,
        //       body_markdown: data.body_markdown,
        //       published: data.published,
        //     },
        //   });
        //   if (updatePostRes.data && updatePostRes.data.update_posts_by_pk) {
        //     const updatedPost = updatePostRes.data.update_posts_by_pk;
        //     if (data.published) {
        //       await router.push(
        //         `${updatedPost.user.username}/articles/${updatedPost.slug}`
        //       );
        //     } else {
        //       reset({
        //         id: updatedPost.id,
        //         title: updatedPost.title,
        //         body_markdown: updatedPost.body_markdown ?? "",
        //         emoji: updatedPost.emoji ?? getRandomEmoji(),
        //         published: updatedPost.published,
        //         tag_keyword: updatedPost.posts_tags.map((tag) => ({
        //           id: tag.id,
        //           label: tag.tag_keyword,
        //           value: tag.tag_keyword,
        //         })),
        //       });
        //       toast.custom(
        //         (t) => (
        //           <SavedToast
        //             visible={t.visible}
        //             onClose={() => toast.dismiss(t.id)}
        //             viewLink={`/api/preview?slug=${
        //               updatedPost.slug
        //             }&preview=${md5(
        //               updatedPost.slug + process.env.NEXT_PUBLIC_SALT
        //             )}`}
        //           />
        //         ),
        //         {
        //           duration: 10000,
        //         }
        //       );
        //     }
        //   }
        // } catch (error) {
        //   logger.debug(error);
        // }
      } else {
        try {
          // create post
          const slug =
            slugify(data.title, {
              lower: true,
              strict: true,
            }) + `-${postid()}`;

          setLoadingText("Creating post");

          // create post
          const postRes = await supabase
            .from<definitions["posts"]>("posts")
            .insert({
              title: data.title.trim(),
              body_markdown: data.body_markdown.trim(),
              emoji: data.emoji,
              published: data.published,
              post_type: "article",
              slug: slug.trim(),
              user_id: data.user_id,
            });

          if (postRes.data) {
            const postId = postRes.data[0].id;

            setLoadingText("Adding tags to post");

            // create post_tag(s)
            const postTagRes = await supabase
              .from<definitions["post_tag"]>("post_tag")
              .insert(
                data.tag_keyword.map((i) => ({
                  posts_id: postId,
                  tags_id: i.value,
                  user_id: data.user_id,
                }))
              );

            if (postTagRes.error) {
              toast.error(
                postTagRes.error.message ??
                  "Error occured when connecting tags to post"
              );
            }

            setLoadingText(undefined);
            const createdPost = postRes.data[0];
            console.log(createdPost);
            router.push("/");
            // if (data.published) {
            //   // just redirect to new created post
            //   await router.push(
            //     `${user?.username}/articles/${createdPost.slug}`
            //   );
            // } else {
            //   // if we are on new
            //   // should push to the newly created post
            //   const res = await fetch(
            //     `/api/preview?slug=${createdPost.slug}&preview=${md5(
            //       createdPost.slug! + process.env.NEXT_PUBLIC_SALT
            //     )}`,
            //     {
            //       method: "GET",
            //       redirect: "follow",
            //     }
            //   );
            //   await router.push(res.url);
            // }
          } else {
            toast.error(
              postRes.error.message ?? "Error occured when creating post"
            );
          }
        } catch (error) {
          logger.debug(error);
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

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copyToClipboard(`![Image description](${uploadedImageUrl})`);
    setCopied(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex items-center space-x-2 mb-4">
          <div className="flex-shrink-0">
            <ArticleImageUpload
              onUpload={(url) => {
                setUploadedImageUrl(url);
              }}
            />
          </div>
          {uploadedImageUrl && (
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <Input
                  readOnly
                  value={`![Image description](${uploadedImageUrl})`}
                  onClick={handleCopy}
                  className="cursor-pointer flex-shrink min-w-0 w-full"
                />
                <Button
                  leftIcon={<FiCopy />}
                  onClick={handleCopy}
                  className="flex-shrink-0"
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="md:border md:rounded-md md:overflow-hidden">
          <Controller
            control={control}
            name="body_markdown"
            render={({ field }) => (
              <Editor
                title={watchedTextArea}
                markdown={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className="pb-6 space-y-2 p-2">
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
              loadingText={loadingText}
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
