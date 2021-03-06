import clsx from "clsx";
import { forwardRef, isValidElement, cloneElement } from "react";

export type SizeVariant = "sm" | "md" | "lg";
type ButtonVariant = "outline" | "solid" | "ghost";
export type ButtonColor = "primary" | "default" | "danger";

interface ButtonOptions<E extends React.ElementType = React.ElementType> {
  /**
   * Button size variants
   * @default "md"
   * @type SizeVariant
   */
  size?: SizeVariant;
  /**
   * Button display variants
   * @default "solid"
   * @type ButtonVariant
   */
  variant?: ButtonVariant;
  /**
   * Button color variants
   * @default "default"
   * @type ButtonColor
   */
  color?: ButtonColor;
  /**
   * If true, will show spinner or loadingText
   * @type boolean
   */
  isLoading?: boolean;
  /**
   * When the isLoading prop is true,
   * will show the loadingText instead of children
   * @type SizeVariant
   */
  loadingText?: string;
  /**
   * Make the border radius round
   * @type Boolean
   */
  isRound?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  isFullWidth?: boolean;
  as?: E;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

const getSize = (size: SizeVariant) => {
  switch (size) {
    case "sm":
      return "btn-sm";
    case "md": {
      return "btn-md";
    }
    case "lg":
      return "btn-lg";
    default:
      return undefined;
  }
};

const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case "outline":
      return "btn-outline";
    case "ghost":
      return "btn-ghost";
    default:
      return undefined;
  }
};

const getColor = (color: ButtonColor) => {
  switch (color) {
    case "default": {
      return undefined;
    }
    case "primary":
      return "btn-primary";
    case "danger":
      return "btn-danger";
    default:
      return undefined;
  }
};

/**
 * General use button component
 */
const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    size = "md",
    variant = "solid",
    color = "default",
    className,
    type = "button",
    isLoading,
    loadingText,
    isDisabled,
    leftIcon,
    rightIcon,
    isFullWidth,
    isRound,
    children,
    ...rest
  } = props;

  const Element = rest.as || "button";

  const merged = clsx(
    "btn",
    getSize(size),
    getVariant(variant),
    getColor(color),
    isLoading && (loadingText ? "btn-loading" : "btn-loading-no-text"),
    isFullWidth && "btn-full",
    isRound && "btn-round",
    className
  );

  return (
    <Element
      ref={ref}
      disabled={isDisabled || isLoading}
      data-testid="button"
      data-loading={isLoading}
      {...rest}
      className={merged}
      type={type}
    >
      {leftIcon && !isLoading && (
        <ButtonIcon className="button-icon-left">{leftIcon}</ButtonIcon>
      )}
      {isLoading
        ? loadingText || <span className="opacity-0 invisible">{children}</span>
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon className="button-icon-right">{rightIcon}</ButtonIcon>
      )}
    </Element>
  );
});

const ButtonIcon: React.FC<{ className?: string }> = (props) => {
  const { children, className, ...rest } = props;

  const _children = isValidElement(children)
    ? cloneElement(children, {
        "aria-hidden": true,
        focusable: false,
        "data-testid": "buttonIcon",
      })
    : children;

  return (
    <span {...rest} className={className}>
      {_children}
    </span>
  );
};

Button.displayName = "Button";
export default Button;
