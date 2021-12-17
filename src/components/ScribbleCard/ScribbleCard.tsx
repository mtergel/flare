import { PostsJoins } from "@/utils/types";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiDisc } from "@react-icons/all-files/fi/FiDisc";
import { FiMessageCircle } from "@react-icons/all-files/fi/FiMessageCircle";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import UserInfo from "ui/ArticleCard/UserInfo";

dayjs.extend(relativeTime);

interface ScribbleCardProps {
  scribble: PostsJoins;
  emojiClass?: string;
}

const ScribbleCard: React.FC<ScribbleCardProps> = ({
  scribble,
  emojiClass,
}) => {
  const merged = clsx(emojiClass, "article-bg");
  console.log(scribble);
  return (
    <article className="article-card">
      <Link
        href={`/${scribble.user.username}/scribbles/${scribble.slug}`}
        passHref
      >
        <a className={merged}>{scribble.emoji}</a>
      </Link>
      <div className="article-content">
        <Link
          href={`/${scribble.user.username}/scribbles/${scribble.slug}`}
          passHref
        >
          <a>
            <h2 className="line-clamp-3 font-bold">{scribble.title}</h2>
          </a>
        </Link>
        <UserInfo user={scribble.user}>
          <div className="flex items-center text-xs text-tMuted space-x-1">
            <div
              className={clsx(
                "flex items-center space-x-1",
                scribble.closed
                  ? "text-violet-500 dark:text-violet-300"
                  : "text-green-500 dark:text-green-300"
              )}
            >
              {scribble.closed ? (
                <>
                  <FiCheckCircle className="h-3 w-3" />
                  <span>Closed</span>
                </>
              ) : (
                <>
                  <FiDisc className="h-3 w-3" />
                  <span>Open</span>
                </>
              )}
            </div>

            <span>·</span>
            <div className="flex items-center justify-center">
              <FiMessageCircle className="h-3 w-3 mr-1" />
              <span className="text-xs">{scribble.comment_count}</span>
            </div>
          </div>
        </UserInfo>
      </div>
    </article>
  );
};

export default ScribbleCard;
