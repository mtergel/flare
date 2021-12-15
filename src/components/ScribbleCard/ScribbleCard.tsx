import { FiDisc } from "@react-icons/all-files/fi/FiDisc";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiMessageCircle } from "@react-icons/all-files/fi/FiMessageCircle";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import HoverCard from "../HoverCard/HoverCard";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";
import { PostsJoins } from "@/utils/types";
import Link from "next/link";
import clsx from "clsx";
import Avatar from "../Avatar/Avatar";
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
        <HoverCard
          contentClassname="w-[300px] p-4"
          content={<HoverUserCard user={scribble.user} />}
        >
          <div>
            <Link href={`/${scribble.user.username}`} passHref>
              <a className="article-user">
                <Avatar
                  src={scribble.user.avatar_url}
                  fallback={scribble.user.display_name}
                  size="sm"
                />
                <div className="article-user-info">
                  <div className="line-clamp-1">
                    {scribble.user.display_name}
                  </div>
                  <div className="flex items-center text-xs text-tMuted space-x-1">
                    <time
                      aria-label="Published at"
                      dateTime={scribble.published_at}
                    >
                      {dayjs(scribble.published_at).fromNow()}
                    </time>
                    {scribble.reading_time && (
                      <>
                        <span>·</span>
                        <span>{`${scribble.reading_time} min read`}</span>
                      </>
                    )}
                    <span>·</span>
                    <div className="flex items-center justify-center">
                      <FiMessageCircle className="h-3 w-3 mr-1" />
                      <span className="text-xs">{scribble.comment_count}</span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </HoverCard>
      </div>
    </article>
  );
};

export default ScribbleCard;
