import Input from "@/components/Input/Input";
import InputGroup from "@/components/InputGroup/InputGroup";
import InputLeftAddon from "@/components/InputGroup/InputLeftAddon";
import InputLeftIcon from "@/components/InputGroup/InputLeftIcon";
import InputRightAddon from "@/components/InputGroup/InputRightAddon";
import { FiActivity } from "@react-icons/all-files/fi/FiActivity";
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

  it("renders input with icons", () => {
    render(
      <InputGroup>
        <InputLeftIcon aria-label="activity icon" icon={<FiActivity />} />
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
    );

    const input = screen.getByTestId("input");
    const inputGroup = screen.getByTestId("input-group");
    const inputLeftIcon = screen.getByTestId("input-left-icon");

    expect(input).toBeInTheDocument();
    expect(inputGroup).toBeInTheDocument();
    expect(inputLeftIcon).toBeInTheDocument();

    expect(input).toHaveClass("pl-10");
  });

  it("renders input with addons", () => {
    render(
      <InputGroup>
        <InputLeftAddon>
          <span>https://</span>
        </InputLeftAddon>
        <Input placeholder="mysite" />
        <InputRightAddon>
          <span>.com</span>
        </InputRightAddon>
      </InputGroup>
    );

    const input = screen.getByTestId("input");
    const inputGroup = screen.getByTestId("input-group");
    const inputLeftAddon = screen.getByTestId("input-left-addon");
    const inputRightAddon = screen.getByTestId("input-right-addon");

    expect(input).toBeInTheDocument();
    expect(inputGroup).toBeInTheDocument();
    expect(inputLeftAddon).toBeInTheDocument();
    expect(inputRightAddon).toBeInTheDocument();
  });
});
