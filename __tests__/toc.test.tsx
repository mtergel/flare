import Toc from "@/components/Toc/Toc";
import { MDHeading } from "@/utils/types";
import { render, screen } from "@testing-library/react";

const headings = [
  {
    content: "Heading 1",
    slug: "heading-1",
    lvl: 1,
    i: 1,
  },
  {
    content: "Heading 2",
    slug: "heading-2",
    lvl: 2,
    i: 2,
  },
  {
    content: "Heading 2-2",
    slug: "heading-2-2",
    lvl: 2,
    i: 3,
  },
  {
    content: "Heading 2-3",
    slug: "heading-2-3",
    lvl: 2,
    i: 4,
  },
  {
    content: "Heading 4",
    slug: "heading-4",
    lvl: 4,
    i: 5,
  },
  {
    content: "Heading 3",
    slug: "heading-3",
    lvl: 3,
    i: 6,
  },
] as MDHeading[];

describe("Table of Content", () => {
  it("renders toc up to lvl3", async () => {
    const { findAllByTestId } = render(<Toc headings={headings} />);

    const items = await findAllByTestId("toc-item");
    expect(items.length).toEqual(headings.length - 1);
  });

  it("has active class", async () => {
    //   heading-2-3 -> 4th item index 3
    const { findAllByTestId } = render(
      <Toc headings={headings} activeId={"heading-2-3"} />
    );
    const items = await findAllByTestId("toc-item");
    expect(items[3]).toHaveClass("active");
  });
});
