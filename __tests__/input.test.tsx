import Input from "@/components/Input/Input";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Input", () => {
  it("renders input", () => {
    render(<Input />);

    const input = screen.getByTestId("input");

    expect(input).toBeInTheDocument();
  });

  it("input disabled", () => {
    render(<Input isDisabled />);

    const input = screen.getByTestId("input");

    expect(input).toBeDisabled();
  });

  it("have fullwidth class", () => {
    render(<Input isFullWidth />);

    const input = screen.getByTestId("input");

    expect(input).toHaveClass("input-full");
  });

  it("input value", () => {
    render(<Input value="test123" readOnly />);

    const input = screen.getByTestId("input");

    expect(input).toHaveDisplayValue("test123");
  });
});
