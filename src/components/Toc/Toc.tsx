import { TocProps } from "@/utils/types";
import clsx from "clsx";
import Link from "next/link";

/**
 * Table of Content Dropdown
 */
const Toc: React.FC<TocProps> = ({ headings, activeId }) => {
  return (
    <ol className="toc-list">
      {headings
        .filter((a) => a.lvl <= 3)
        .map((i) => (
          <li
            key={i.i}
            className={clsx(
              activeId === i.slug && "active",
              i.lvl >= 3 && "depth-2"
            )}
          >
            <Link href={`#${i.slug}`} passHref>
              <a>{i.content}</a>
            </Link>
          </li>
        ))}
    </ol>
  );
};

export default Toc;
