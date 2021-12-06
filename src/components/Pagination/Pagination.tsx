import Button from "@/components/Button/Button";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import Link from "next/link";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  buildLink: (page: number) => string;
}

const buttonSize = "sm";
// find the corrent styling for this
const buttonCx = "w-8";

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  itemsPerPage,
  buildLink,
}) => {
  if (totalCount > itemsPerPage) {
    const pages = Math.ceil(totalCount / itemsPerPage);
    const buttons = buildButtons(currentPage, pages, buildLink);

    return (
      <nav className="flex justify-center">
        <ul className="flex space-x-1">
          <li>
            {currentPage === 1 ? (
              <Button
                leftIcon={<FiChevronLeft />}
                size={buttonSize}
                variant="ghost"
                isDisabled
              >
                Previous
              </Button>
            ) : (
              <Link href={buildLink(currentPage - 1)} passHref>
                <Button
                  leftIcon={<FiChevronLeft />}
                  size={buttonSize}
                  variant="ghost"
                  //@ts-ignore
                  rel="prev"
                  as="a"
                >
                  Previous
                </Button>
              </Link>
            )}
          </li>

          {buttons.map((i) => (
            <li key={i.key}>{i}</li>
          ))}

          <li>
            {currentPage === pages ? (
              <Button
                rightIcon={<FiChevronRight />}
                size={buttonSize}
                variant="ghost"
                isDisabled
              >
                Next
              </Button>
            ) : (
              <Link href={buildLink(currentPage + 1)} passHref>
                <Button
                  rightIcon={<FiChevronRight />}
                  size={buttonSize}
                  variant="ghost"
                  //@ts-ignore
                  rel="next"
                  as="a"
                >
                  Next
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    );
  } else {
    // pagination not needed
    return null;
  }
};

const buildButtons = (
  currentPage: number,
  pages: number,
  buildLink: (page: number) => string
) => {
  let returnJSX: JSX.Element[] = [];

  if (pages < 6) {
    for (let i = 0; i < pages; i++) {
      returnJSX.push(
        <Link href={buildLink(i + 1)} passHref key={i + 1}>
          <Button
            as="a"
            size={buttonSize}
            color={i + 1 === currentPage ? "primary" : "default"}
            variant={i + 1 === currentPage ? "solid" : "ghost"}
            className={buttonCx}
          >
            {i + 1}
          </Button>
        </Link>
      );
    }
  } else if (currentPage > 4 && currentPage < pages - 3) {
    // first page
    returnJSX.push(
      <Link href={buildLink(1)} passHref key={1}>
        <Button
          as="a"
          size={buttonSize}
          color="default"
          variant="ghost"
          className={buttonCx}
        >
          {1}
        </Button>
      </Link>
    );

    returnJSX.push(
      <span key="short-left" className="gap">
        ...
      </span>
    );

    // add n-1 page
    returnJSX.push(
      <Link href={buildLink(currentPage - 1)} passHref key={currentPage - 1}>
        <Button
          as="a"
          size={buttonSize}
          color="default"
          variant="ghost"
          className={buttonCx}
        >
          {currentPage - 1}
        </Button>
      </Link>
    );

    // add n page
    returnJSX.push(
      <Link href={buildLink(currentPage)} passHref key={currentPage}>
        <Button
          as="a"
          size={buttonSize}
          color="primary"
          variant="solid"
          className={buttonCx}
        >
          {currentPage}
        </Button>
      </Link>
    );

    // add n+1 page
    returnJSX.push(
      <Link href={buildLink(currentPage + 1)} passHref key={currentPage + 1}>
        <Button
          as="a"
          size={buttonSize}
          color="default"
          variant="ghost"
          className={buttonCx}
        >
          {currentPage + 1}
        </Button>
      </Link>
    );

    returnJSX.push(
      <span key="short-right" className="gap">
        ...
      </span>
    );

    // last page
    returnJSX.push(
      <Link href={buildLink(pages)} passHref key={pages}>
        <Button
          as="a"
          size={buttonSize}
          color="default"
          variant="ghost"
          className={buttonCx}
        >
          {pages}
        </Button>
      </Link>
    );
  } else if (currentPage < 5) {
    //   first 5 buttons
    for (let i = 0; i < 5; i++) {
      returnJSX.push(
        <Link href={buildLink(i + 1)} passHref key={i + 1}>
          <Button
            as="a"
            size={buttonSize}
            color={i + 1 === currentPage ? "primary" : "default"}
            variant={i + 1 === currentPage ? "solid" : "ghost"}
            className={buttonCx}
          >
            {i + 1}
          </Button>
        </Link>
      );
    }
    returnJSX.push(
      <span key="short-right" className="gap">
        ...
      </span>
    );
    // last page
    returnJSX.push(
      <Link href={buildLink(pages)} passHref key={pages}>
        <Button
          as="a"
          size={buttonSize}
          color="default"
          variant="ghost"
          className={buttonCx}
        >
          {pages}
        </Button>
      </Link>
    );
  } else {
    // first page
    returnJSX.push(
      <Link href={buildLink(1)} passHref key={1}>
        <Button
          as="a"
          size={buttonSize}
          color="default"
          variant="ghost"
          className={buttonCx}
        >
          {1}
        </Button>
      </Link>
    );

    returnJSX.push(
      <span key="short-left" className="gap">
        ...
      </span>
    );

    //   last 5 buttons
    for (let i = pages - 5; i < pages; i++) {
      returnJSX.push(
        <Link href={buildLink(i + 1)} passHref key={i + 1}>
          <Button
            as="a"
            size={buttonSize}
            color={i + 1 === currentPage ? "primary" : "default"}
            variant={i + 1 === currentPage ? "solid" : "ghost"}
            className={buttonCx}
          >
            {i + 1}
          </Button>
        </Link>
      );
    }
  }

  return returnJSX;
};

export default Pagination;
