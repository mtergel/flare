import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputRightAddon {}

type Ref = HTMLDivElement;

export type InputRightAddonProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputRightAddon;

const InputRightAddon = forwardRef<Ref, InputRightAddonProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const merged = clsx(className, "input-right-addon");

  return (
    <div
      ref={ref}
      className={merged}
      data-testid="input-right-addon"
      {...rest}
      id="input-right-addon"
    >
      {children}
    </div>
  );
});

InputRightAddon.displayName = "InputRightAddon";
export default InputRightAddon;
