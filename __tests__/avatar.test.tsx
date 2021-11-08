import Avatar from "@/components/Avatar/Avatar";
import { render, waitFor } from "@testing-library/react";
import React from "react";

// avatar has an delay of 600ms
const DELAY = 600;
const LOAD_IMAGE = "load";
const ERROR_IMAGE = "error";
const orignalImage = window.Image;

const mockImage = (loadState: "load" | "error") => {
  jest.useFakeTimers();
  (window.Image as unknown) = class {
    onload: () => void = () => {};
    onerror: () => void = () => {};
    src: string = "";
    constructor() {
      setTimeout(() => {
        switch (loadState) {
          case LOAD_IMAGE:
            this.onload();
            break;
          case ERROR_IMAGE:
            this.onerror();
            break;
          default:
            break;
        }
      }, DELAY);
      return this;
    }
  };
};

describe("Avatar", () => {
  test("renders image", async () => {
    mockImage(LOAD_IMAGE);
    const src =
      "https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";
    const name = "Girl";
    const { container } = render(<Avatar fallback={name} src={src} />);

    await waitFor(() => {
      jest.advanceTimersByTime(DELAY);
    });

    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", src);
  });

  test("shows fallback if broken link", async () => {
    mockImage(ERROR_IMAGE);
    const name = "Girl";
    const { getByTestId } = render(
      <Avatar src="broken-link" fallback={name} />
    );

    await waitFor(() => {
      jest.advanceTimersByTime(DELAY);
    });

    const fallback = getByTestId("afallback");
    expect(fallback).toHaveTextContent("G");
  });

  test("shows fallback if no link", async () => {
    mockImage(ERROR_IMAGE);
    const name = "Girl";
    const { getByTestId } = render(<Avatar fallback={name} />);

    await waitFor(() => {
      jest.advanceTimersByTime(DELAY);
    });

    const fallback = getByTestId("afallback");
    expect(fallback).toHaveTextContent("G");
  });
});
