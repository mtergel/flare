import React, { forwardRef } from "react";
import Button, { ButtonProps, SizeVariant } from "@/components/Button/Button";
import clsx from "clsx";

type Omitted = "leftIcon" | "isFullWidth" | "rightIcon" | "loadingText" | "ref";

const getSize = (size: SizeVariant) => {
  switch (size) {
    case "sm":
      return "ibtn-sm";
    case "md": {
      return "ibtn-md";
    }
    case "lg":
      return "ibtn-lg";
    default:
      return undefined;
  }
};

interface BaseButtonProps extends Omit<ButtonProps, Omitted> {}

export interface IconButtonProps extends BaseButtonProps {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * A11y: A label that describes the button
   */
  "aria-label": string;
  /**
   * Make the border radius round
   * @type Boolean
   */
  isRound?: boolean;
}

type Ref = HTMLButtonElement;

const IconButton = forwardRef<Ref, IconButtonProps>((props, ref) => {
  const {
    icon,
    size = "md",
    "aria-label": ariaLabel,
    children,
    isRound,
    className,
    ...rest
  } = props;

  /**
   * Passing the icon as prop or children should work
   */
  const element = icon || children;
  const _children = React.isValidElement(element)
    ? React.cloneElement(element as any, {
        "aria-hidden": true,
        focusable: false,
      })
    : null;

  const merged = clsx(
    className,
    getSize(size),
    isRound && "ibtn-round",
    "text-tMuted"
  );

  return (
    <Button
      ref={ref}
      className={merged}
      aria-label={ariaLabel}
      data-testid="icon-button"
      {...rest}
    >
      {_children}
    </Button>
  );
});

IconButton.displayName = "IconButton";

export default IconButton;
