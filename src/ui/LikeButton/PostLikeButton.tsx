import { Likes } from "@/utils/types";
import { useAuth } from "context/auth";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import IconButton from "@/components/IconButton/IconButton";

interface PostLikeButtonProps {
  likes: Likes;
}

const PostLikeButton: React.FC<PostLikeButtonProps> = ({ likes }) => {
  const { user } = useAuth();

  return <IconButton aria-label="like" icon={<FiHeart />} isRound />;
};

export default PostLikeButton;
