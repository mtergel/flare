import { Likes } from "@/utils/types";
import { useAuth } from "context/auth";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import IconButton, {
  IconButtonProps,
} from "@/components/IconButton/IconButton";
import usePostLiked from "hooks/supabase-hooks/like/usePostLiked";
import { useState } from "react";

interface PostLikeButtonProps {
  like_count: number;
  post_id: number;
  hideCount?: boolean;
  buttonProps?: Omit<IconButtonProps, "aria-label">;
}

const PostLikeButton: React.FC<PostLikeButtonProps> = (props) => {
  const { hideCount, buttonProps, like_count } = props;
  const { user } = useAuth();

  if (user) {
    return <LoggedIn user_id={user.id} {...props} />;
  }

  if (hideCount) {
    return (
      <IconButton
        aria-label="like"
        icon={<FiHeart />}
        variant="ghost"
        // disabled={isLoading}
        {...buttonProps}
      />
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <IconButton
        aria-label="like"
        icon={<FiHeart />}
        variant="ghost"
        size="lg"
        // disabled={isLoading}
        {...buttonProps}
      />
      <span className="text-sm text-tMuted">{like_count}</span>
    </div>
  );
};

interface LoggenInProps extends PostLikeButtonProps {
  user_id: string;
}
const LoggedIn: React.FC<LoggenInProps> = ({
  like_count,
  post_id,
  hideCount,
  buttonProps,
  user_id,
}) => {
  // const { data, isLoading, error } = usePostLiked(user_id, post_id);

  const [checked, setChecked] = useState(false);

  if (hideCount) {
    return (
      <LikeButton
        id={`${post_id}-hide-count`}
        checked={checked}
        onChange={(e) => setChecked(e)}
      />
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <LikeButton
        id={`${post_id}-with-count`}
        checked={checked}
        onChange={(e) => setChecked(e)}
      />
      <span className="text-sm text-tMuted">{like_count}</span>
    </div>
  );
};

interface LikeButtonProps {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}
const LikeButton: React.FC<LikeButtonProps> = ({ checked, id, onChange }) => {
  return (
    <div className="likeBtn-container">
      <input
        checked={checked}
        type="checkbox"
        className="likeBtn"
        id={`likeBtn-${id}`}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
      <label htmlFor={`likeBtn-${id}`}>
        <svg
          id="heart-svg"
          viewBox="467 392 58 57"
          height="30"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <g
            id="Group"
            fill="none"
            fillRule="evenodd"
            transform="translate(467 392)"
          >
            <path
              d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
              id="heart"
            />
            <circle
              id="main-circ"
              fill="#E2264D"
              opacity="0"
              cx="28"
              cy="28"
              r="1"
            />

            <g id="grp7" opacity="0" transform="translate(0 0)">
              <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
              <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
            </g>

            <g id="grp6" opacity="0" transform="translate(0 28)">
              <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
              <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
            </g>

            <g id="grp3" opacity="0" transform="translate(52 28)">
              <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
              <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
            </g>

            <g id="grp2" opacity="0" transform="translate(44 6)">
              <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
              <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
            </g>

            <g id="grp5" opacity="0" transform="translate(14 50)">
              <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
              <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
            </g>

            <g id="grp4" opacity="0" transform="translate(35 50)">
              <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
              <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
            </g>

            <g id="grp1" opacity="0" transform="translate(24)">
              <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
              <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
            </g>
          </g>
        </svg>
      </label>
    </div>
  );
};

export default PostLikeButton;
