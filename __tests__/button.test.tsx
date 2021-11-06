import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/Button/Button";
import { MdFlare } from "@react-icons/all-files/md/MdFlare";

describe("Button", () => {
  it("renders button", () => {
    const { getByText } = render(<Button>Email</Button>);

    const button = screen.getByTestId("button");

    expect(button).toBeInTheDocument();
    expect(getByText("Email")).toBeTruthy();
  });
  it("disabled button", () => {
    render(<Button disabled>Email</Button>);

    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
  });

  it("loading button", () => {
    render(<Button isLoading>Email</Button>);

    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
    expect(screen.getByText("Email")).toHaveClass("opacity-0 invisible");
  });

  it("loading button with custom text", () => {
    render(
      <Button isLoading loadingText="Wait">
        Email
      </Button>
    );

    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
    expect(screen.queryByText("Email")).toBeNull();
  });

  it("icon button", () => {
    render(<Button leftIcon={<MdFlare />} />);

    const buttonIcon = screen.getByTestId("buttonIcon");

    expect(buttonIcon).toBeInTheDocument();
  });
});
