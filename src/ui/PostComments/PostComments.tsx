import Fallback from "@/components/Fallback/Fallback";
import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { Comment } from "@/utils/types";
import { useAuth } from "context/auth";
import ReplyProvider from "context/reply";
import useFetchPostComments from "hooks/supabase-hooks/comments/useFetchPostComments";
import { useState } from "react";
import toast from "react-hot-toast";
import { mutate as globalMutate } from "swr";
import CommentEditor from "ui/CommentEditor/CommentEditor";
import ErrorMessage from "ui/misc/ErrorMessage";
import CommentBlock from "./CommentBlock";

interface PostCommentsProps {
  postId: number;
  postOwner: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ postId, postOwner }) => {
  const { data, isLoading, error, mutate } = useFetchPostComments(postId);

  const { user } = useAuth();
  const [creating, setCreating] = useState(false);

  if (error) {
    return (
      <div className="text-center">
        <ErrorMessage text={error.message} />
      </div>
    );
  }
  if (isLoading) {
    return <Fallback />;
  }

  if (data) {
    const handleDeleteMutation = async (comment: Comment) => {
      if (comment.parent_comment_id) {
        await globalMutate(
          [comment.parent_comment_id, "__post_comment_replies"],
          undefined
        );
      }
      // deleteing top level comment
      await mutate();
    };

    /**
     *
     * @param input - commented value as md string
     * @param parentComment - Pass this value if you are replying to a comment
     */
    const handleCreate = async (
      input: string,
      parentComment: Comment | null
    ) => {
      setCreating(true);

      if (parentComment) {
        const createdReply = await supabase
          .from<definitions["post_comments"]>("post_comments")
          .insert({
            parent_comment_id: parentComment.id,
            comment_value: input,
            posts_id: postId,
            user_id: user?.id,
          })
          .single();

        if (createdReply.error) {
          toast.error(createdReply.error.message);
        } else {
          // if replying to reply
          await globalMutate(
            [parentComment.id, "__post_comment_replies"],
            undefined,
            true
          );

          if (data.find((i) => i.id === parentComment.id)) {
            // if replying to top level comment;
            await mutate();
          }
        }

        logger.debug(createdReply.data);
      } else {
        const { data, error } = await supabase
          .from<definitions["post_comments"]>("post_comments")
          .insert({
            comment_value: input,
            posts_id: postId,
            user_id: user?.id,
          })
          .single();

        if (error) {
          toast.error(error.message);
        }

        await mutate();

        logger.debug(data);
      }

      setCreating(false);
    };

    return (
      <>
        <div className="border-b text-2xl font-bold pb-2">Comments</div>
        <div className="pt-4">
          <ReplyProvider postOwner={postOwner}>
            {data.map((comment) => (
              <CommentBlock
                key={comment.id}
                comment={comment}
                onDeleteMutation={handleDeleteMutation}
              />
            ))}
            <CommentEditor onSubmit={handleCreate} loading={creating} />
          </ReplyProvider>
        </div>
      </>
    );
  }

  return null;
};

export default PostComments;
