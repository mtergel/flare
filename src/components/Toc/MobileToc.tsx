import { TocProps } from "@/utils/types";
import { FiArrowUp } from "@react-icons/all-files/fi/FiArrowUp";
import { FiList } from "@react-icons/all-files/fi/FiList";
import clsx from "clsx";
import useDisclosure from "hooks/useDisclosure";
import Link from "next/link";
import Button from "../Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../Dropdown/Dropdown";
import IconButton from "../IconButton/IconButton";

const MobileToc: React.FC<TocProps> = ({ headings, activeId }) => {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const scrollToTop = () => {
    if (typeof window !== undefined) {
      window.scrollTo({
        top: 0,
      });
    }
    onClose();
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="table of content" icon={<FiList />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={4}
        className="p-4 max-w-xs overflow-auto"
      >
        <div className="mb-2 ">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<FiArrowUp className="h-5 w-5" />}
            onClick={scrollToTop}
          >
            Scroll to top
          </Button>
        </div>

        <ol className="toc-list">
          {headings
            .filter((a) => a.lvl <= 3)
            .map((i) => (
              <li
                key={i.i}
                className={clsx(
                  "whitespace-normal line-clamp-1",
                  activeId === i.slug && "active",
                  i.lvl >= 3 && "depth-2"
                )}
              >
                <Link href={`#${i.slug}`} passHref>
                  <a onClick={onClose}>{i.content}</a>
                </Link>
              </li>
            ))}
        </ol>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileToc;
