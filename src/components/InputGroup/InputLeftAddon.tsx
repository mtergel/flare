import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputLeftAddon {}

type Ref = HTMLDivElement;

export type InputLeftAddonProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputLeftAddon;

const InputLeftAddon = forwardRef<Ref, InputLeftAddonProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const merged = clsx(className, "input-left-addon");

  return (
    <div
      ref={ref}
      className={merged}
      data-testid="input-left-addon"
      {...rest}
      id="input-left-addon"
    >
      {children}
    </div>
  );
});

InputLeftAddon.displayName = "InputLeftAddon";
export default InputLeftAddon;
