import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import HoverCard from "@/components/HoverCard/HoverCard";
import IconButton from "@/components/IconButton/IconButton";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs/Tabs";
import Tooltip from "@/components/Tooltip/Tooltip";
import { replyProcessor } from "@/utils/markdownProcessor";
import { Comment } from "@/utils/types";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { SiMarkdown } from "@react-icons/all-files/si/SiMarkdown";
import clsx from "clsx";
import { useAuth } from "context/auth";
import { useReplyTo } from "context/reply";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";
import { UserLogin } from "ui/Layout/UserButton";

const RawEditor = dynamic(() => import("@/components/Editor/RawEditor"), {
  ssr: false,
  loading: () => <p className="text-sm">Loading...</p>,
});
const Preview = dynamic(() => import("@/components/Editor/Preview"), {
  ssr: false,
  loading: () => <p className="text-sm">Loading...</p>,
});

interface CommentEditorProps {
  onSubmit: (value: string, comment: Comment | null) => void;
  loading?: boolean;
}

const CommentEditor: React.FC<CommentEditorProps> = ({ onSubmit, loading }) => {
  const { user } = useAuth();
  const [editorState, setEditorState] = useState<"write" | "preview">("write");

  const [markdown, setMarkdown] = useState("");
  const handleChange = (input: string) => {
    setMarkdown(input);
  };

  const replyTo = useReplyTo();
  const handleCancelReply = () => {
    if (replyTo) {
      replyTo.setReplyTo(null);
    }
  };

  // TODO
  // cant clear editor after submit
  // any idea?!
  const handleSubmit = () => {
    onSubmit(markdown, replyTo?.replyTo ?? null);
    if (replyTo) {
      replyTo.setReplyTo(null);
    }
  };

  if (user) {
    return (
      <div className={clsx(replyTo?.replyTo && "comment-reply")}>
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
            <div className="sm:rounded-t-md overflow-hidden pt-2 px-3 bg-slate-200 dark:bg-black">
              {replyTo && replyTo.replyTo && (
                <div className="text-sm mb-2">
                  <div className="flex items-center justify-between">
                    <div className="text-tMuted font-bold mb-1">Reply to</div>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      aria-label="cancel reply"
                      icon={<FiX />}
                      onClick={handleCancelReply}
                      disabled={loading}
                    />
                  </div>
                  <ReplyToRender
                    value={replyTo.replyTo.comment_value.slice(0, 20)}
                    avatarUrl={replyTo.replyTo.user.avatar_url}
                    displayName={replyTo.replyTo.user.display_name}
                  />
                </div>
              )}
              <Tabs
                value={editorState}
                onValueChange={(val) =>
                  setEditorState(val as "write" | "preview")
                }
              >
                <TabsList
                  aria-label="Markdown editor tab write/preview"
                  className="sm:rounded-t-md relative"
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
                  isLoading={loading}
                  onClick={handleSubmit}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center space-y-4">
        <p>You must be logged in to comment.</p>
        <UserLogin />
      </div>
    );
  }
};

interface ReplyToRenderProps {
  value: string;
  avatarUrl?: string;
  displayName?: string;
}
const ReplyToRender: React.FC<ReplyToRenderProps> = ({
  value,
  avatarUrl,
  displayName,
}) => {
  // replyProcessor
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateMD = async () => {
      setLoading(true);

      setContent(String(await replyProcessor.process(value)));

      setLoading(false);
    };

    generateMD();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <span>&quot;...&quot;</span>;
  }

  return (
    <div className="flex items-center space-x-1 p-1 bg-slate-300 dark:bg-slate-700 rounded-md text-tMuted dark:text-tDefault">
      <Avatar src={avatarUrl} fallback={displayName} size="sm" />
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
export default CommentEditor;
