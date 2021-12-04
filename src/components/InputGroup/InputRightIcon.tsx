import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import clsx from "clsx";

interface InputRightIcon {
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

export type InputRightIconProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputRightIcon;

const InputRightIcon = forwardRef<Ref, InputRightIconProps>((props, ref) => {
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

  const merged = clsx(className, "input-right-icon");

  return (
    <div
      ref={ref}
      className={merged}
      data-testid="input-right-icon"
      {...rest}
      id="input-right-icon"
    >
      {_children}
    </div>
  );
});

InputRightIcon.displayName = "InputRightIcon";
export default InputRightIcon;
