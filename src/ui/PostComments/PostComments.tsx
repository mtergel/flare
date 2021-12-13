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
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
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
        // deleteing reply to comment
        await globalMutate(
          [comment.parent_comment_id, "__post_comment_replies"],
          undefined
        );
      }
      // deleteing top level comment
      await mutate();
    };

    const handleCreate = async (input: string, comment: Comment | null) => {
      setCreating(true);

      if (comment) {
        const { data, error } = await supabase
          .from<definitions["post_comments"]>("post_comments")
          .insert({
            parent_comment_id: comment.id,
            comment_value: input,
            posts_id: postId,
            user_id: user?.id,
          })
          .single();

        if (error) {
          toast.error(error.message);
        } else {
          // MUTATE
          if (comment.parent_comment_id) {
            // if replying to reply
            globalMutate(
              [comment.parent_comment_id, "__post_comment_replies"],
              undefined
            );
          } else {
            // replying to top level comment
            mutate();
          }
        }

        logger.debug(data);
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

        mutate();

        logger.debug(data);
      }

      setCreating(false);
    };

    return (
      <>
        <div className="border-b text-2xl font-bold pb-2">Comments</div>
        <div className="pt-4">
          <ReplyProvider>
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
