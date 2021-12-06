import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import clsx from "clsx";

interface InputLeftIcon {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * A11y: A label that describes the button
   */
  "aria-label": string;
}

type Ref = HTMLDivElement;

export type InputLeftIconProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputLeftIcon;

const InputLeftIcon = forwardRef<Ref, InputLeftIconProps>((props, ref) => {
  const { className, icon, children, ...rest } = props;

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

  const merged = clsx(className, "input-left-icon");

  return (
    <div
      ref={ref}
      className={merged}
      data-testid="input-left-icon"
      {...rest}
      id="input-left-icon"
    >
      {_children}
    </div>
  );
});

InputLeftIcon.displayName = "InputLeftIcon";
export default InputLeftIcon;
