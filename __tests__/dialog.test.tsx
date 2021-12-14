import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

describe("Dialog", () => {
  it("renders dialog", () => {
    render(
      <Dialog
        title="Test"
        open
        content={<div data-testid="content">Content</div>}
      >
        <Button>Trigger</Button>
      </Dialog>
    );

    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });

  it("triggers by button", () => {
    const { getByTestId, queryByTestId } = render(
      <Dialog title="Test" content={<div data-testid="content">Content</div>}>
        <Button>Trigger</Button>
      </Dialog>
    );

    expect(queryByTestId("content")).toBeNull();

    const button = getByTestId("button");
    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(queryByTestId("content")).toBeInTheDocument();
  });
});
