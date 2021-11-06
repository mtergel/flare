import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/Button/Button";

describe("Button", () => {
  it("renders button", () => {
    render(<Button />);

    const button = screen.getByTestId("button");

    expect(button).toBeInTheDocument();
  });
  it("disabled button", () => {
    render(<Button disabled />);

    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
  });

  it("loading button", () => {
    render(<Button isLoading />);

    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
  });
});
