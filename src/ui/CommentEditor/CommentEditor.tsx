import Avatar from "@/components/Avatar/Avatar";
import HoverCard from "@/components/HoverCard/HoverCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs/Tabs";
import { useAuth } from "context/auth";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";

interface CommentEditorProps {}

const CommentEditor: React.FC<CommentEditorProps> = () => {
  const { user } = useAuth();

  const { handleSubmit, control } = useForm();

  const { resolvedTheme } = useTheme();
  const [editorState, setEditorState] = useState<"write" | "preview">("write");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (user) {
    return (
      <div>
        <div className="relative mt-4 pl-4 ml-10">
          <div className="block ">
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
            <div className="rounded-t-md border overflow-hidden pt-2 px-3 bg-slate-200 dark:bg-black">
              <Tabs
                value={editorState}
                onValueChange={(val) =>
                  setEditorState(val as "write" | "preview")
                }
              >
                <TabsList
                  aria-label="Markdown editor tab write/preview"
                  className="rounded-t-md"
                >
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CommentEditor;
