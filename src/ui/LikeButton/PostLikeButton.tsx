import Dialog from "@/components/Dialog/Dialog";
import Spinner from "@/components/Spinner/Spinner";
import { useAuth } from "context/auth";
import usePostLiked from "hooks/supabase-hooks/like/usePostLiked";
import useDisclosure from "hooks/useDisclosure";
import { DetailedHTMLProps, forwardRef, HTMLAttributes, useState } from "react";
import LoginForm from "ui/Auth/LoginForm";

interface PostLikeButtonProps {
  like_count: number;
  post_id: number;
  hideCount?: boolean;
}

const PostLikeButton: React.FC<PostLikeButtonProps> = (props) => {
  const { hideCount, like_count, post_id } = props;
  const { user } = useAuth();
  const { isOpen, setIsOpen, onOpen } = useDisclosure();

  if (user) {
    return <LoggedIn user_id={user.id} {...props} />;
  }

  const LoginButton: React.FC<{}> = () => {
    return (
      <Dialog
        title="Flare"
        description="Where programmers share ideas and help each other grow."
        open={isOpen}
        onOpenChange={setIsOpen}
        content={
          <div className="h-full sm:h-96">
            <LoginForm />
          </div>
        }
      >
        <LikeButton
          id={`${post_id}-hide-count`}
          checked={false}
          onValueChange={() => onOpen()}
        />
      </Dialog>
    );
  };

  if (hideCount) {
    return <LoginButton />;
  }

  return (
    <div className="flex items-center space-x-2">
      <LoginButton />
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
  user_id,
}) => {
  const [localCount, setLocalCount] = useState(like_count);
  const updateCount = (change: number) =>
    setLocalCount((prev) => prev + change);
  const { data, isLoading, error, like, unlike } = usePostLiked(
    user_id,
    post_id
  );

  // This localCount will only work on component level
  // meaning if you two button were to be rendered
  // and if one updates the count
  // the count won't be shown in the other
  // *TODO

  const handleLike = (_checked: boolean) => {
    if (!isLoading) {
      if (_checked) {
        if (!data) {
          // data is null
          like();
          updateCount(1);
        }
      } else {
        if (data) {
          unlike();
          updateCount(-1);
        }
      }
    }
  };

  const handleChange = (e: boolean) => {
    handleLike(e);
  };

  if (isLoading) {
    return (
      <div className="likeBtn-container">
        <Spinner size="sm" className="text-primary" />
      </div>
    );
  }

  if (data !== undefined) {
    if (hideCount) {
      return (
        <LikeButton
          id={`${post_id}-hide-count`}
          checked={Boolean(data)}
          onValueChange={(e) => handleChange(e)}
          disabled={isLoading || Boolean(error)}
        />
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <LikeButton
          id={`${post_id}-with-count`}
          checked={Boolean(data)}
          onValueChange={(e) => handleChange(e)}
          disabled={isLoading || Boolean(error)}
        />
        <span className="text-sm text-tMuted">{localCount}</span>
      </div>
    );
  }

  return null;
};

interface LikeButtonOptions {
  id: string;
  checked: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

type Ref = HTMLDivElement;

export type LikeButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  LikeButtonOptions;

// weird sizes and animation
// if needed larger size or small size
// consider changing to normal svg icons
const LikeButton = forwardRef<Ref, LikeButtonProps>((props, ref) => {
  const { checked, id, disabled, onValueChange, ...rest } = props;
  return (
    <div className="likeBtn-container" ref={ref} {...rest}>
      <input
        checked={checked}
        type="checkbox"
        className="likeBtn"
        id={`likeBtn-${id}`}
        onChange={(e) => onValueChange(e.currentTarget.checked)}
        disabled={disabled}
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
});

LikeButton.displayName = "LikeButton";

export default PostLikeButton;
