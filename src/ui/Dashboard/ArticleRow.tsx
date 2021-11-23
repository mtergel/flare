import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import IconButton from "@/components/IconButton/IconButton";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import { GoMarkdown } from "@react-icons/all-files/go/GoMarkdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Post_Type_Enum,
  useDeletePostMutation,
  useDeletePostsTagsMutation,
} from "graphql/generated/graphql";
import md5 from "md5";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import logger from "@/utils/logger";

dayjs.extend(relativeTime);

type Post = {
  body_markdown?: string | null | undefined;
  created_at?: any | null | undefined;
  emoji?: string | null | undefined;
  id: any;
  published: boolean;
  slug: string;
  title: string;
  updated_at?: any | null | undefined;
  post_type: Post_Type_Enum;
  posts_tags: Array<{
    id: any;
    tag_keyword: string;
  }>;
};

interface ArticleRowProps {
  post: Post;
  username: string;
}
const ArticleRow: React.FC<ArticleRowProps> = ({ post, username }) => {
  const handleGenerateMD = () => {
    const generatedBlob = new Blob([post.body_markdown ?? ""], {
      type: "text/plain;charset=utf8",
    });
    const generatedUrl = URL.createObjectURL(generatedBlob);
    if (typeof window !== undefined) {
      window.open(generatedUrl, "_blank")?.focus();
    }
  };

  const [_deleteRes, deletePost] = useDeletePostMutation();
  const [_deletePostTags, deletePostTags] = useDeletePostsTagsMutation();
  const [toastText, setToastText] = useState<string>("");

  const handleDelete = () => {
    toast.promise(deletingPost(), {
      loading: toastText,
      success: <b>Deleted!</b>,
      error: <p>Could not delete.</p>,
    });
  };

  const deletingPost = async () => {
    try {
      setToastText("Deleting tags...");
      const toDeletePostTags = post.posts_tags.map((i) => i.id);
      logger.debug("Deleting tags...: ", toDeletePostTags);

      await deletePostTags({
        where: {
          id: {
            _in: toDeletePostTags,
          },
        },
      });

      setToastText("Deleting post...");
      logger.debug("Deleting post...: ", post.id);

      await deletePost({
        id: post.id,
      });

      setToastText("");
    } catch (error) {
      logger.debug(error);
    }
  };

  return (
    <article key={post.id} className="pt-4">
      <div className="flex items-start justify-between">
        <Link href={`/articles/${post.id}/edit`} passHref>
          <a className="font-semibold text-lg line-clamp-2 pr-6">
            {post.title}
          </a>
        </Link>
        <div className="space-x-3 flex-shrink-0">
          {post.published ? (
            <Link
              href={
                toastText !== "" ? "#" : `/${username}/articles/${post.slug}`
              }
              passHref
            >
              <IconButton
                as="a"
                aria-label="view"
                icon={<FiPlay />}
                variant="outline"
              />
            </Link>
          ) : (
            <IconButton
              as="a"
              // @ts-ignore // how to add this to typescript
              href={`/api/preview?slug=${post.slug}&preview=${md5(
                post.slug + process.env.NEXT_PUBLIC_SALT
              )}`}
              aria-label="preview"
              icon={<FiPlay />}
              variant="outline"
            />
          )}
          <Link
            href={toastText !== "" ? "#" : `/articles/${post.id}/edit`}
            passHref
          >
            <IconButton
              as="a"
              aria-label="edit"
              icon={<FiEdit2 />}
              variant="outline"
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                aria-label="more options"
                icon={<FiChevronDown />}
                variant="ghost"
                disabled={toastText !== ""}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={4}>
              <DropdownMenuItem asChild onClick={handleGenerateMD}>
                <div>
                  <DropdownMenuLeftSlot>
                    <GoMarkdown />
                  </DropdownMenuLeftSlot>
                  Get raw markdown
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild color="danger">
                <div onClick={handleDelete}>
                  <DropdownMenuLeftSlot>
                    <FiTrash2 />
                  </DropdownMenuLeftSlot>
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <footer className="text-xs flex items-center flex-wrap gap-2 text-gray-500">
        <div className="border rounded py-1 px-2">
          {post.published ? "Published" : "Draft"}
        </div>
        <time>{dayjs(post.updated_at).fromNow()}</time>
      </footer>
    </article>
  );
};

export default ArticleRow;
