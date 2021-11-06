import React from "react";
import { render, screen } from "@testing-library/react";
import Container from "@/components/Container/Container";

describe("Container", () => {
  it("renders container", () => {
    const { getByText } = render(
      <Container>
        <p>Hello</p>
      </Container>
    );

    const container = screen.getByTestId("container");

    expect(container).toBeInTheDocument();
    expect(getByText("Hello")).toBeTruthy();
  });

  it("renders wide container", () => {
    render(
      <Container isWide>
        <p>Hello</p>
      </Container>
    );

    const container = screen.getByTestId("container");

    expect(container).toHaveClass("wide");
  });
});
