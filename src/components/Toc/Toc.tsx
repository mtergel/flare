import { MDHeading } from "@/utils/types";
import Link from "next/link";

interface TocProps {
  headings: MDHeading[];
}
/**
 * Table of Content Dropdown
 */
const Toc: React.FC<TocProps> = ({ headings }) => {
  return (
    <ol className="toc-list">
      {headings.map((i) => (
        <li key={i.i}>
          <Link href={`#${i.slug}`} passHref>
            <a>{i.content}</a>
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default Toc;
