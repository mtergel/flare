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
import { EditTag, GetPostForEdit, PostsJoins } from "@/utils/types";
import { FiCopy } from "@react-icons/all-files/fi/FiCopy";
import compact from "lodash/compact";
import keyBy from "lodash/keyBy";
import md5 from "md5";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import readingTime from "reading-time";
import slugify from "slugify";
import { mutate } from "swr";
import EmojiPicker from "ui/ArticleEditor/EmojiPicker";
import ArticleImageUpload from "./ArticleImageUpload";
import SavedToast from "./SavedToast";

const TagSelector = dynamic(() => import("ui/ArticleEditor/TagSelector"), {
  ssr: false,
});

interface ArticleEditorProps {
  id?: number | null;
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
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copyToClipboard(`![Image description](${uploadedImageUrl})`);
    setCopied(true);
  };

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
      user_id,
    },
  });

  const onSubmit = async (data: {
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

      if (id) {
        // update method
        const postTags = keyBy(tag_keyword, "value");
        let toAdd: { posts_id: number; tags_id: string; user_id: string }[] =
          [];
        data.tag_keyword.forEach((tag) => {
          // check if postTags have been added
          if (!postTags.hasOwnProperty(tag.value)) {
            // not in initial values
            // so must be added
            toAdd.push({
              posts_id: id,
              tags_id: tag.value,
              user_id: data.user_id,
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

        if (toAdd.length > 0) {
          setLoadingText("Creating tags");

          const newTagsRes = await supabase
            .from<definitions["post_tag"]>("post_tag")
            .upsert(toAdd);
          if (newTagsRes.error) {
            logger.debug(newTagsRes.error);
            toast.error(
              newTagsRes.error.message ??
                "Error occured when connecting tags to post"
            );
          }
        }

        logger.debug(toRemovePostTags);

        if (toRemovePostTags.length > 0) {
          setLoadingText("Removing tags");

          const deleteTagsRes = await supabase
            .from<definitions["post_tag"]>("post_tag")
            .delete()
            .in("id", toRemovePostTags);

          logger.debug(deleteTagsRes);

          if (deleteTagsRes.error) {
            toast.error(
              deleteTagsRes.error.message ??
                "Error occured when connecting tags to post"
            );
          }
        }

        setLoadingText("Updating post");

        const updatePostRes = await supabase
          .from<definitions["posts"]>("posts")
          .update({
            title: data.title,
            emoji: data.emoji,
            body_markdown: data.body_markdown,
            published: data.published,
            reading_time: Math.ceil(readingTime(data.body_markdown).minutes),
          })
          .eq("id", id)
          .single();

        const fetchPost = await supabase
          .from<definitions["posts"]>("posts")
          .select(
            `
            *,
            tags:post_tag (*),
            user:user_id (username)
            `
          )
          .eq("id", id)
          .single();

        if (updatePostRes.data?.published) {
          await fetch("/api/clearPreviewData");
        }

        setLoadingText(undefined);

        if (fetchPost.data) {
          mutate([fetchPost.data.id, "__article"]);

          reset({
            id: fetchPost.data.id,
            body_markdown: fetchPost.data.body_markdown,
            emoji: fetchPost.data.emoji,
            published: fetchPost.data.published,
            tag_keyword: (fetchPost.data as GetPostForEdit).tags.map((i) => ({
              id: i.id,
              label: i.tags_id,
              value: i.tags_id,
            })),
            title: fetchPost.data.title,
            user_id: fetchPost.data.user_id,
          });

          if (updatePostRes.data) {
            toast.custom(
              (t) => (
                <SavedToast
                  visible={t.visible}
                  onClose={() => toast.dismiss(t.id)}
                  published={updatePostRes.data.published}
                  onClick={async () => {
                    if (updatePostRes.data.published) {
                      router.push(
                        `/${
                          (fetchPost.data as PostsJoins).user.username
                        }/articles/${updatePostRes.data.slug}`
                      );
                      toast.dismiss(t.id);
                    } else {
                      const session = supabase.auth.session();
                      const res = await fetch(
                        `/api/preview?slug=${
                          updatePostRes.data.slug
                        }&preview=${md5(
                          updatePostRes.data.slug + process.env.NEXT_PUBLIC_SALT
                        )}`,
                        {
                          headers: {
                            Authorization: `Bearer ${session?.access_token}`,
                          },
                          redirect: "follow",
                        }
                      );
                      router.push(res.url);
                      toast.dismiss(t.id);
                    }
                  }}
                />
              ),
              {
                duration: 10000,
              }
            );
          } else {
            logger.debug("Could not update post");
            toast.error("Could not update post");
          }
        } else {
          logger.debug("Could not fetch post");
          toast.error("Could not update post");
        }
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
              reading_time: Math.ceil(readingTime(data.body_markdown).minutes),
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

            await router.push("/user/dashboard");

            setLoadingText(undefined);
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
        <div className="space-y-2 p-2 bg-paper rounded-lg mb-4">
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
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <ArticleImageUpload
                onUpload={(url) => {
                  setUploadedImageUrl(url);
                }}
                user_id={user_id}
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
        </div>
        <div className="editor">
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
          <div className="editor-actions">
            <Container className="flex items-center justify-end space-x-6">
              <div className="flex items-center space-x-3">
                <label
                  htmlFor="published"
                  className="text-sm font-semibold text-tMuted"
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
            </Container>
          </div>
        </div>
      </Container>
    </form>
  );
};

export default ArticleEditor;
