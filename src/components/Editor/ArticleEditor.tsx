import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import Switch from "@/components/Switch/Switch";
import { getRandomEmoji } from "@/utils/const";
import postid from "@/utils/postid";
import { EditTag } from "@/utils/types";
import "emoji-mart/css/emoji-mart.css";
import {
  Post_Type_Enum,
  useCreatePostMutation,
  useInsertTagsMutation,
} from "graphql/generated/graphql";
import md5 from "md5";
import { useRouter } from "next/dist/client/router";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";
import logger from "utils/logger";
import EmojiPicker from "./EmojiPicker";
import dynamic from "next/dynamic";

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
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    setError,
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

  const router = useRouter();
  const [_tags, insertTags] = useInsertTagsMutation();
  const [_post, createPost] = useCreatePostMutation();
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
        // TODO Update
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-20">
      <Container size="small">
        <textarea
          placeholder="Title"
          maxLength={70}
          spellCheck={false}
          autoFocus
          rows={2}
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

export default ArticleEditor;
