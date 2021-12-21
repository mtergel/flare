import { PostsJoins } from "@/utils/types";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import UserInfo from "./UserInfo";

dayjs.extend(relativeTime);
interface ArticleCardProps {
  article: PostsJoins;
  emojiClass?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, emojiClass }) => {
  const merged = clsx(emojiClass, "article-bg");

  return (
    <article className="article-card">
      <Link
        href={`/${article.user.username}/articles/${article.slug}`}
        passHref
        prefetch={false}
      >
        <a className={merged}>{article.emoji}</a>
      </Link>
      <div className="article-content">
        <Link
          href={`/${article.user.username}/articles/${article.slug}`}
          passHref
          prefetch={false}
        >
          <a>
            <h2 className="line-clamp-3 font-bold">{article.title}</h2>
          </a>
        </Link>
        <UserInfo user={article.user}>
          <div className="flex items-center text-xs text-tMuted space-x-1">
            <time aria-label="Published at" dateTime={article.published_at}>
              {dayjs(article.published_at).fromNow()}
            </time>
            {article.reading_time && (
              <>
                <span>·</span>
                <span>{`${article.reading_time} min read`}</span>
              </>
            )}
            <span>·</span>
            <div className="flex items-center justify-center">
              <FiHeart className="h-3 w-3 mr-1" />
              <span className="text-xs">{article.like_count}</span>
            </div>
          </div>
        </UserInfo>
      </div>
    </article>
  );
};

export default ArticleCard;
