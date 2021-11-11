import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import IconButton from "@/components/IconButton/IconButton";
import Switch from "@/components/Switch/Switch";
import { defaultEmojis, getRandomEmoji } from "@/utils/const";
import { FiArrowLeft } from "@react-icons/all-files/fi/FiArrowLeft";
import { FiSliders } from "@react-icons/all-files/fi/FiSliders";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import useDisclosure from "hooks/useDisclosure";
import { useTheme } from "next-themes";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Dialog from "../Dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../Dropdown/Dropdown";

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
  const { theme, setTheme } = useTheme();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      id,
      title,
      body_html,
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
      console.log(data);

      if (data.published) {
        // open modal
      } else {
        // just proceed normal
      }
    } else {
      if (!data.title) {
        toast.error("An title is required.");
      }
    }
  };

  return (
    <>
      <header className="h-16 shadow-md dark:border-b">
        <Container className="h-full">
          <div className="flex items-center justify-between h-full">
            <IconButton
              variant="ghost"
              aria-label="dashboard"
              isRound
              icon={<FiArrowLeft />}
            />
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton
                    variant="ghost"
                    aria-label="theme"
                    isRound
                    icon={<FiSun />}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={4}>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value)}
                  >
                    <DropdownMenuRadioItem value="system">
                      System
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="light">
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      Dark
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Container>
      </header>
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
          <Controller
            control={control}
            name="body_html"
            render={({ field }) => (
              <Editor content={field.value} onChange={field.onChange} />
            )}
          />
          <div className="py-4 flex items-center justify-end space-x-6">
            <Dialog
              title="Settings"
              description="Article settings"
              open={isOpen}
              onOpenChange={setIsOpen}
              content={
                <>
                  <header>
                    <h1>
                      <div className="text-lg font-bold flex-grow flex space-x-1 items-center">
                        <span className="text-3xl">Settings</span>
                      </div>
                    </h1>
                  </header>
                  <div className="space-y-2 mt-8">
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
                </>
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
            >
              Save
            </Button>
          </div>
        </Container>
      </form>
    </>
  );
};

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}
const EmojiPicker: React.FC<EmojiPickerProps> = ({ value, onChange }) => {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const { resolvedTheme } = useTheme();

  return (
    <section className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gray-bg w-full p-5 rounded-lg">
            <span className="text-5xl border-r pr-4 mr-5">{value}</span>
            <div className="flex flex-col items-start text-left text-sm text-gray-600">
              <span>Select an eye catching emoji</span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={4}>
          <Picker
            color={"#3EA8FF"}
            recent={defaultEmojis}
            theme={resolvedTheme as any}
            showPreview={false}
            showSkinTones={false}
            exclude={["flags", "symbols"]}
            onSelect={(data) => {
              // @ts-ignore
              onChange(data.native);
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default ArticleEditor;
