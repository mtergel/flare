import {
  AlertActionButton,
  AlertCancelButton,
  AlertDialog,
} from "@/components/AlertDialog/AlertDialog";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import Preview from "@/components/Editor/Preview";
import HoverCard from "@/components/HoverCard/HoverCard";
import IconButton from "@/components/IconButton/IconButton";
import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { Comment } from "@/utils/types";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import { useAuth } from "context/auth";
import { useReplyTo } from "context/reply";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useDisclosure from "hooks/useDisclosure";
import Link from "next/link";
import toast from "react-hot-toast";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";
import CommentReplies from "./CommentReplies";

dayjs.extend(relativeTime);

interface CommentBlockProps {
  comment: Comment;
  onDeleteMutation: (comment: Comment) => Promise<void>;
}

const CommentBlock: React.FC<CommentBlockProps> = ({
  comment,
  onDeleteMutation,
}) => {
  const { user } = useAuth();
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  const replyTo = useReplyTo();

  const handleDeleteComment = () => {
    toast.promise(
      deletingComment(),
      {
        loading: <b>Deleting...</b>,
        success: <b>Deleted comment!</b>,
        error: <p>Could not delete.</p>,
      },
      {
        position: "top-center",
      }
    );
  };

  const deletingComment = async () => {
    logger.debug("Deleting comment...: ", comment.id);

    const res = await supabase
      .from<definitions["post_comments"]>("post_comments")
      .delete()
      .match({
        id: comment.id,
      });
    if (res.error) {
      logger.debug(res.error);
      throw res.error;
    } else {
      await onDeleteMutation(comment);
    }
  };

  const onReply = () => {
    if (replyTo) replyTo.setReplyTo(comment);
  };

  return (
    <div>
      <div className="relative mt-4 md:pl-4 md:ml-10">
        <div className="hidden md:block">
          <span className="float-left -ml-14">
            <HoverCard
              contentClassname="w-[300px] p-4"
              content={<HoverUserCard user={comment.user} />}
            >
              <div>
                <Link href={`/${comment.user.username}`} passHref>
                  <a className="article-user">
                    <Avatar
                      src={comment.user.avatar_url}
                      fallback={comment.user.display_name}
                    />
                  </a>
                </Link>
              </div>
            </HoverCard>
          </span>
        </div>
        <div>
          <div className="comment comment-caret">
            <div className="flex items-center space-x-1 rounded-t-md overflow-hidden px-4 py-2 bg-slate-200 dark:bg-black">
              <div className="text-sm flex items-center space-x-2 flex-grow">
                <h3 className="line-clamp-1">
                  <strong>{comment.user.display_name}</strong>
                  <span className="text-tMuted"> @{comment.user.username}</span>
                </h3>
                <span className="text-tMuted flex-shrink-0">
                  commented{" "}
                  <time aria-label="commented at" dateTime={comment.created_at}>
                    {dayjs(comment.created_at).fromNow()}
                  </time>
                </span>
              </div>

              <div className="h-8">
                {user &&
                  (comment.user_id === user.id ||
                    replyTo?.postOwner === user.id) && (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <IconButton
                            aria-label="comment options"
                            size="sm"
                            variant="ghost"
                            icon={<FiMoreHorizontal />}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={1}>
                          <DropdownMenuItem
                            color="danger"
                            asChild
                            onClick={onOpen}
                          >
                            <div>
                              <DropdownMenuLeftSlot>
                                <FiTrash2 />
                              </DropdownMenuLeftSlot>
                              Delete
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialog
                        title="Delete comment"
                        description="Are you sure you want to delete this comment?"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        actions={
                          <div className="alert-button-container">
                            <AlertCancelButton>Cancel</AlertCancelButton>
                            <AlertActionButton
                              className="alert-danger"
                              onClick={handleDeleteComment}
                            >
                              Delete
                            </AlertActionButton>
                          </div>
                        }
                      />
                    </>
                  )}
              </div>
            </div>
            <div className="p-2 rounded-b-md bg-paper">
              <div className="mx-2 ">
                <div className="prose prose-sm dark:prose-invert text-sm max-w-5xl mx-auto">
                  <Preview value={comment.comment_value} />
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={onReply}>
                Reply
              </Button>
            </div>
          </div>
          {comment.children_count[0].count > 0 && (
            <CommentReplies
              commentId={comment.id}
              count={comment.children_count[0].count}
              onDeleteMutation={onDeleteMutation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;
