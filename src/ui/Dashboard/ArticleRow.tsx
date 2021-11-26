import {
  AlertDialog,
  AlertCancelButton,
  AlertActionButton,
} from "@/components/AlertDialog/AlertDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import IconButton from "@/components/IconButton/IconButton";
import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import { GoMarkdown } from "@react-icons/all-files/go/GoMarkdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useDisclosure from "hooks/useDisclosure";
import md5 from "md5";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

interface ArticleRowProps {
  article: definitions["posts"];
  username: string;
}
const ArticleRow: React.FC<ArticleRowProps> = ({ article, username }) => {
  const handleGenerateMD = () => {
    const generatedBlob = new Blob(
      [
        `--- title: "${article.title}" emoji: "${article.emoji}" type: "${article.post_type}" topics: [] published: ${article.published} --- \n`.concat(
          article.body_markdown ?? ""
        ),
      ],
      {
        type: "text/plain;charset=utf8",
      }
    );
    const generatedUrl = URL.createObjectURL(generatedBlob);
    if (typeof window !== undefined) {
      window.open(generatedUrl, "_blank")?.focus();
    }
  };

  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    toast.promise(
      deletingPost(),
      {
        loading: <b>Deleting...</b>,
        success: <b>Deleted!</b>,
        error: <p>Could not delete.</p>,
      },
      {
        position: "top-center",
      }
    );
  };

  const deletingPost = async () => {
    try {
      setLoading(true);
      // const toDeletePostTags = article.posts_tags.map((i) => i.id);
      // logger.debug("Deleting tags...: ", toDeletePostTags);

      // await deletePostTags({
      //   where: {
      //     id: {
      //       _in: toDeletePostTags,
      //     },
      //   },
      // });

      // logger.debug("Deleting post...: ", post.id);

      // await deletePost({
      //   id: post.id,
      // });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.debug(error);
    }
  };

  return (
    <article key={article.id} className="pt-4">
      <div className="flex items-start justify-between">
        <Link href={`/articles/${article.id}/edit`} passHref>
          <a className="font-semibold text-lg line-clamp-2 pr-6">
            {article.title}
          </a>
        </Link>
        <div className="space-x-3 flex-shrink-0">
          {article.published ? (
            <Link
              href={loading ? "#" : `/${username}/articles/${article.slug}`}
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
              href={`/api/preview?slug=${article.slug}&preview=${md5(
                article.slug + process.env.NEXT_PUBLIC_SALT
              )}`}
              aria-label="preview"
              icon={<FiPlay />}
              variant="outline"
            />
          )}
          <Link href={loading ? "#" : `/articles/${article.id}/edit`} passHref>
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
                disabled={loading}
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
              <DropdownMenuItem color="danger" asChild onClick={onOpen}>
                <div>
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
          {article.published ? "Published" : "Draft"}
        </div>
        <time>{dayjs(article.updated_at).fromNow()}</time>
      </footer>
      <AlertDialog
        title="Delete article"
        description="Do you really want to delete?"
        open={isOpen}
        onOpenChange={setIsOpen}
        actions={
          <div className="alert-button-container">
            <AlertActionButton className="alert-danger" onClick={handleDelete}>
              Delete
            </AlertActionButton>
            <AlertCancelButton>Cancel</AlertCancelButton>
          </div>
        }
      />
    </article>
  );
};

export default ArticleRow;
