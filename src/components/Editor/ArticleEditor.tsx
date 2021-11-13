import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import IconButton from "@/components/IconButton/IconButton";
import Switch from "@/components/Switch/Switch";
import { getRandomEmoji } from "@/utils/const";
import { FiSliders } from "@react-icons/all-files/fi/FiSliders";
import "emoji-mart/css/emoji-mart.css";
import useDisclosure from "hooks/useDisclosure";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Dialog from "../Dialog/Dialog";
import EmojiPicker from "./EmojiPicker";

interface ArticleEditorProps {
  id?: string | null;
  title?: string | null;
  body_html?: string | null;
  published?: boolean | null;
  emoji?: string | null;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  id,
  title,
  body_html,
  published,
  emoji,
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
      body_html: body_html ?? "",
      published,
      emoji: emoji ?? getRandomEmoji(),
    },
  });

  const { isOpen, setIsOpen, onOpen } = useDisclosure();

  const onSubmit = async (data: {
    id?: string | null;
    title: string;
    body_html: string;
    published: boolean;
  }) => {
    console.log(data);
    if (data.title) {
      if (data.published) {
        onOpen();
      } else {
        // just proceed normal
        let res;
        if (data.id) {
          // const res =await update()
        } else {
          // const res = await create();
        }
      }
    } else {
      if (!data.title) {
        toast.error("An title is required.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container size="small">
        <textarea
          placeholder="Title"
          maxLength={70}
          spellCheck={false}
          rows={1}
          className="editor-title"
          {...register("title")}
        />
        <div className="md:border md:rounded-md md:overflow-hidden">
          <Controller
            control={control}
            name="body_html"
            render={({ field }) => (
              <Editor markdown={field.value} onChange={field.onChange} />
            )}
          />
          <div className="flex items-center justify-end space-x-6 mx-2 mb-2">
            <Dialog
              title="Settings"
              description="Article settings"
              open={isOpen}
              onOpenChange={setIsOpen}
              content={
                <div className="flex flex-col h-full">
                  <header>
                    <h1>
                      <div className="text-lg font-bold flex-grow flex space-x-1 items-center">
                        <span className="text-3xl">Settings</span>
                      </div>
                    </h1>
                  </header>
                  <div className="mt-8 flex-grow flex flex-col">
                    <div className="flex flex-col flex-grow space-y-2">
                      <Controller
                        control={control}
                        name="emoji"
                        render={({ field }) => (
                          <EmojiPicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-center">
                      <Button
                        type="button"
                        color="primary"
                        disabled={!isDirty}
                        isLoading={isSubmitting}
                      >
                        {isDirty ? "Save" : "Saved"}
                      </Button>
                    </div>
                  </div>
                </div>
              }
            >
              <IconButton
                onClick={onOpen}
                isRound
                variant="ghost"
                aria-label="article-settings"
                icon={<FiSliders />}
                type="button"
              />
            </Dialog>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="publish"
                className="text-sm font-semibold text-gray-500"
              >
                Publish
              </label>
              <Controller
                control={control}
                name="published"
                render={({ field }) => (
                  <Switch
                    id="publish"
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
