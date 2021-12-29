import Button from "@/components/Button/Button";
import ScribbleCard from "@/components/ScribbleCard/ScribbleCard";
import { themeColor } from "@/utils/const";
import { PostsJoins } from "@/utils/types";
import useInfiniteScribbles from "hooks/supabase-hooks/scribbles/useInfiniteScribbles";
import { Browser } from "react-kawaii";
import ErrorMessage from "ui/misc/ErrorMessage";

interface UserScribblesProps {
  userId: string;
  initialData: PostsJoins[];
}

const itemsPerPage = 24;

const UserScribbles: React.FC<UserScribblesProps> = ({
  userId,
  initialData,
}) => {
  const { isEmpty, data, isReachingEnd, isLoadingMore, setSize, error, size } =
    useInfiniteScribbles(userId, itemsPerPage, initialData);

  if (isEmpty) {
    return (
      <div className="py-8 flex flex-col items-center justify-center space-y-6">
        <Browser size={200} mood="shocked" color={themeColor} />
        <span className="text-tMuted text-lg">No scribbles added yet.</span>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data!.map((subset) =>
          subset.map((i) => <ScribbleCard key={i.id} scribble={i} />)
        )}
      </div>

      {error && <ErrorMessage text={error.message} />}

      {!isReachingEnd && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={() => setSize(size + 1)}
            isLoading={isLoadingMore}
            disabled={isReachingEnd}
            variant="outline"
          >
            {isReachingEnd ? "No more scribbles." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserScribbles;
