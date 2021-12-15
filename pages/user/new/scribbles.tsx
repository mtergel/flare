import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import FormControl from "@/components/FormControl/FormControl";
import Input from "@/components/Input/Input";
import Spinner from "@/components/Spinner/Spinner";
import { getRandomEmoji } from "@/utils/const";
import { definitions } from "@/utils/generated";
import { postid } from "@/utils/ids";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout } from "@/utils/types";
import { GiStabbedNote } from "@react-icons/all-files/gi/GiStabbedNote";
import { useAuth } from "context/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";
import Layout from "ui/Layout/Layout";

const EmojiPicker = dynamic(() => import("ui/ArticleEditor/EmojiPicker"), {
  ssr: false,
});

const NewScribble: NextPageWithLayout = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: "",
      emoji: getRandomEmoji(),
    },
  });

  if (loading) {
    return (
      <div className="h-full bg-paper border-t">
        <div className="pt-20 flex items-center justify-center">
          <Spinner className="text-primary" />
        </div>
      </div>
    );
  }

  if (user) {
    const onSubmit = async (data: { title: string; emoji: string }) => {
      // 1. Generate slug
      const slug =
        slugify(data.title.trim(), {
          lower: true,
          strict: true,
        }) + `-${postid()}`;

      // 2. Create scribble (post)
      const newPost = await supabase
        .from<definitions["posts"]>("posts")
        .insert({
          title: data.title.trim(),
          published: true,
          post_type: "scribble",
          emoji: data.emoji,
          slug,
          user_id: user.id,
        })
        .single();

      // 3. Redirect to it
      if (newPost.data) {
        toast.success("Created scribble!");
        router.push(`/${user.username}/scribbles/${slug}`);
      }

      // 4. Else catch errors and show in toast
      if (newPost.error) {
        logger.debug(newPost.error);
        toast.error(newPost.error.message);
      }
    };

    return (
      <div className="h-full bg-paper border-t">
        <Container className="pt-12 sm:pt-20" size="small">
          <div className="text-center flex flex-col">
            <h1 className="text-3xl font-bold">New scribble</h1>
            <div className="flex items-center justify-center mt-8 mb-4">
              <GiStabbedNote className="h-20 w-20  text-primary-500 dark:text-primary-300" />
            </div>
            <p className="text-tMuted text-sm">
              In a &quot;scribble&quot; you can summarize your knowledge in a
              thread format. It can be used not only for recording development
              but also for sharing info and exchanging opinions.
            </p>
          </div>
          <div className="mt-6 mx-auto max-w-sm">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <FormControl inValid={!!errors.title}>
                <label htmlFor="name">Title</label>
                <Input
                  id="name"
                  autoComplete="off"
                  isFullWidth
                  autoFocus
                  {...register("title", {
                    disabled: isSubmitting,
                    required: {
                      message: "A title is required",
                      value: true,
                    },
                    maxLength: {
                      message: "Maximum length can be up to 50 characters",
                      value: 50,
                    },
                  })}
                />
                {errors.title && (
                  <span className="error">{errors.title.message}</span>
                )}
              </FormControl>

              <Controller
                control={control}
                name="emoji"
                render={({ field }) => (
                  <EmojiPicker value={field.value} onChange={field.onChange} />
                )}
              />

              <div className="text-center pt-4">
                <Button
                  color="primary"
                  isFullWidth
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    );
  } else {
    return null;
  }
};

NewScribble.getLayout = function getLayout(page) {
  return <Layout hideFooter>{page}</Layout>;
};
export default NewScribble;
