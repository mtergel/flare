import Fallback from "@/components/Fallback/Fallback";
import Spinner from "@/components/Spinner/Spinner";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Spinner", () => {
  it("renders spinner", () => {
    render(<Spinner />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("renders fallback", () => {
    render(<Fallback />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });
});
