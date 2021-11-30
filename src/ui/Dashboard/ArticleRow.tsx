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
import { supabase } from "@/utils/supabaseClient";
import { PostsJoins } from "@/utils/types";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { FiPlay } from "@react-icons/all-files/fi/FiPlay";
import { FiTrash2 } from "@react-icons/all-files/fi/FiTrash2";
import { GoMarkdown } from "@react-icons/all-files/go/GoMarkdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useDisclosure from "hooks/useDisclosure";
import md5 from "md5";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

interface ArticleRowProps {
  article: PostsJoins;
  username: string;
  onDeleteMutation: (id: number) => void;
}
const ArticleRow: React.FC<ArticleRowProps> = ({
  article,
  username,
  onDeleteMutation,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    toast.promise(
      deletingPost(),
      {
        loading: <b>Deleting...</b>,
        success: <b>Deleted article!</b>,
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
      logger.debug("Deleting post...: ", article.id);

      await supabase
        .from<definitions["posts"]>("posts")
        .delete()
        .match({ id: article.id });

      onDeleteMutation(article.id);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.debug(error);
    }
  };

  const handleGenerateMD = () => {
    const generatedBlob = new Blob(
      [
        `--- title: "${article.title}" emoji: "${article.emoji}" type: "${
          article.post_type
        }" tags: ${JSON.stringify(article.tags.map((i) => i.id))} published: ${
          article.published
        } --- \n\n`.concat(article.body_markdown ?? ""),
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

  const handleGeneratePreviewMode = async () => {
    try {
      const session = supabase.auth.session();
      const res = await fetch(
        `/api/preview?slug=${article.slug}&preview=${md5(
          article.slug + process.env.NEXT_PUBLIC_SALT
        )}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
          redirect: "follow",
        }
      );
      router.push(res.url);
    } catch (error) {
      toast.error("Error occured when generating preview");
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
              aria-label="generate preview url"
              icon={<FiPlay />}
              variant="outline"
              isDisabled={loading}
              onClick={handleGeneratePreviewMode}
            />
          )}
          <Link href={loading ? "#" : `/articles/${article.id}/edit`} passHref>
            <IconButton
              as="a"
              aria-label="edit"
              icon={<FiEdit2 />}
              variant="outline"
              isDisabled={loading}
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                aria-label="more options"
                icon={<FiChevronDown />}
                variant="ghost"
                isDisabled={loading}
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
        <div className="border rounded py-[2px] px-[5px]">
          {article.published ? "Published" : "Draft"}
        </div>
        <div className="flex items-center space-x-1">
          <span>Updated: </span>

          <time aria-label="updated at" dateTime={article.updated_at}>
            {dayjs(article.updated_at).fromNow()}
          </time>
        </div>

        <time
          aria-label="created at"
          className="hidden"
          dateTime={article.created_at}
        >
          {dayjs(article.created_at).fromNow()}
        </time>
      </footer>
      <AlertDialog
        title="Delete article"
        description="Do you really want to delete?"
        open={isOpen}
        onOpenChange={setIsOpen}
        actions={
          <div className="alert-button-container">
            <AlertCancelButton>Cancel</AlertCancelButton>
            <AlertActionButton className="alert-danger" onClick={handleDelete}>
              Delete
            </AlertActionButton>
          </div>
        }
      />
    </article>
  );
};

export default ArticleRow;
