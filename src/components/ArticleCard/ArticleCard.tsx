import { PostsJoins } from "@/utils/types";
import Link from "next/link";
import Avatar from "../Avatar/Avatar";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
interface ArticleCardProps {
  article: PostsJoins;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="article-card">
      <Link
        href={`/${article.user.username}/articles/${article.slug}`}
        passHref
      >
        <a className="article-bg">{article.emoji}</a>
      </Link>
      <div className="article-content">
        <Link
          href={`/${article.user.username}/articles/${article.slug}`}
          passHref
        >
          <a>
            <h2 className="line-clamp-3 font-bold">{article.title}</h2>
          </a>
        </Link>
        <Link href={`/${article.user.username}`} passHref>
          <a className="article-user">
            <Avatar
              src={article.user.avatar_url}
              fallback={article.user.display_name}
              size="sm"
            />
            <div className="article-user-info">
              <div className="line-clamp-1">{article.user.display_name}</div>
              <div className="flex items-center text-xs text-gray-500 space-x-1">
                <time aria-label="Published at" dateTime={article.published_at}>
                  {dayjs(article.published_at).fromNow()}
                </time>
                {article.reading_time && (
                  <>
                    <span>·</span>
                    <span>{`${article.reading_time} min read`}</span>
                  </>
                )}
              </div>
            </div>
          </a>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
