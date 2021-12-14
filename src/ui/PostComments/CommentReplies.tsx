import Button from "@/components/Button/Button";
import Fallback from "@/components/Fallback/Fallback";
import { Comment } from "@/utils/types";
import useFetchReplies from "hooks/supabase-hooks/comments/useFetchReplies";
import useDisclosure from "hooks/useDisclosure";
import CommentBlock from "./CommentBlock";

interface CommentRepliesProps {
  commentId: number;
  count: number;
  onDeleteMutation: (comment: Comment) => Promise<void>;
}

// TODO
// Find a way to change this to infinite loader ?
// With working mutation from PostComments
// To refresh when adding, deleting comment

const CommentReplies: React.FC<CommentRepliesProps> = ({
  commentId,
  count,
  onDeleteMutation,
}) => {
  const { isOpen, toggle } = useDisclosure();
  const { data, isLoading } = useFetchReplies(isOpen ? commentId : undefined);
  return (
    <div className="mt-2">
      <Button variant="ghost" size="sm" onClick={toggle}>
        {isOpen ? "Hide replies" : `View replies (${count})`}
      </Button>
      {isOpen && (
        <div>
          {isLoading && <Fallback />}
          {!isLoading &&
            data &&
            data.map((i) => (
              <CommentBlock
                key={i.id}
                comment={i}
                onDeleteMutation={onDeleteMutation}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CommentReplies;
