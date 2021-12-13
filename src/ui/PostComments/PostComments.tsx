import Fallback from "@/components/Fallback/Fallback";
import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "context/auth";
import useFetchPostComments from "hooks/supabase-hooks/comments/useFetchPostComments";
import { useState } from "react";
import toast from "react-hot-toast";
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
    const handleDeleteMutation = (id: number) => {
      mutate(async (comments) => {
        if (comments) {
          const filteredComments = comments.filter(
            (comment) => comment.id !== id
          );
          return [...filteredComments];
        }
      }, false);
    };

    const handleCreate = async (input: string) => {
      setCreating(true);
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

      setCreating(false);
    };

    return (
      <>
        <div className="border-b text-2xl font-bold pb-2">Comments</div>
        <div className="pt-4">
          {data.map((comment) => (
            <CommentBlock
              key={comment.id}
              comment={comment}
              onDeleteMutation={handleDeleteMutation}
            />
          ))}
          <CommentEditor onSubmit={handleCreate} loading={creating} />
        </div>
      </>
    );
  }

  return null;
};

export default PostComments;
