import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import HoverCard from "@/components/HoverCard/HoverCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs/Tabs";
import Tooltip from "@/components/Tooltip/Tooltip";
import { SiMarkdown } from "@react-icons/all-files/si/SiMarkdown";
import { useAuth } from "context/auth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";

const RawEditor = dynamic(() => import("@/components/Editor/RawEditor"), {
  ssr: false,
  loading: () => <p className="text-sm">Loading...</p>,
});
const Preview = dynamic(() => import("@/components/Editor/Preview"), {
  ssr: false,
  loading: () => <p className="text-sm">Loading...</p>,
});

interface CommentEditorProps {}

const CommentEditor: React.FC<CommentEditorProps> = () => {
  const { user } = useAuth();

  const [editorState, setEditorState] = useState<"write" | "preview">("write");

  const [markdown, setMarkdown] = useState("");

  const handleChange = (input: string) => {
    setMarkdown(input);
  };

  if (user) {
    return (
      <div>
        <div className="relative mt-4 md:pl-4 md:ml-10">
          <div className="hidden md:block">
            <span className="float-left -ml-14">
              <HoverCard
                contentClassname="w-[300px] p-4"
                content={<HoverUserCard user={user} />}
              >
                <div>
                  <Link href={`/${user.username}`} passHref>
                    <a className="article-user">
                      <Avatar
                        src={user.avatar_url}
                        fallback={user.display_name}
                      />
                    </a>
                  </Link>
                </div>
              </HoverCard>
            </span>
          </div>
          <div className="comment comment-caret">
            <div className="rounded-t-md overflow-hidden pt-2 px-3 bg-slate-200 dark:bg-black">
              <Tabs
                value={editorState}
                onValueChange={(val) =>
                  setEditorState(val as "write" | "preview")
                }
              >
                <TabsList
                  aria-label="Markdown editor tab write/preview"
                  className="rounded-t-md relative"
                >
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="p-2 rounded-b-md bg-paper">
              {editorState === "write" ? (
                <div className="rounded-md border mt-2">
                  <RawEditor
                    value={markdown}
                    onChange={handleChange}
                    className="comment-md-editor"
                    disableLineNumber
                    placeholderString="Leave a comment"
                  />
                  <div className="flex items-center justify-end pr-2 pb-1">
                    <Tooltip content="Markdown is supported">
                      <div>
                        <SiMarkdown className="h-5 w-5 text-tMuted" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <div className="mx-2 pb-4 border-b-2">
                  <div className="prose dark:prose-invert text-sm max-w-5xl mx-auto">
                    {markdown ? (
                      <Preview value={markdown} />
                    ) : (
                      <p>Nothing to preview.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-end">
                <Button
                  color="primary"
                  size="sm"
                  disabled={markdown.length === 0}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CommentEditor;
