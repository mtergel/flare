import { definitions } from "@/utils/generated";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface TagProps {
  tag: definitions["tags"];
  className?: string;
  largeImage?: boolean;
}

const Tag: React.FC<TagProps> = ({ tag, className, largeImage }) => {
  const merged = clsx("article-tag", className);

  const imageMerged = clsx(
    "rounded-full border",
    largeImage ? "h-8 w-8" : "h-6 w-6"
  );
  const imageSize = largeImage ? 32 : 24;

  return (
    <Link passHref href={`/tags/${tag.id}`}>
      <a className={merged}>
        <div className={imageMerged}>
          <Image
            alt=""
            src={tag.image_url}
            width={imageSize}
            height={imageSize}
            className="rounded-full border"
          />
        </div>
        <span>{tag.name}</span>
      </a>
    </Link>
  );
};

export default Tag;
