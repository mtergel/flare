import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputOptions {
  className?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
}

type Ref = HTMLInputElement;

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputOptions;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { className, isDisabled, isFullWidth, children, ...rest } = props;

  const merged = clsx(className, "input", isFullWidth && "input-full");

  return (
    <input
      ref={ref}
      disabled={isDisabled}
      {...rest}
      className={merged}
      data-testid="input"
    >
      {children}
    </input>
  );
});

Input.displayName = "Input";
export default Input;
