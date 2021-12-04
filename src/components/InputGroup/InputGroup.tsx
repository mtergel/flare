import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import clsx from "clsx";
import { getValidChildren } from "@/utils/getValidChildren";

interface InputGroupOptions {}

type Ref = HTMLDivElement;

export type InputGroupProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputGroupOptions;

const InputGroup = forwardRef<Ref, InputGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  let merged = clsx(className, "input-group");

  let inputStyles: string | undefined = "flex-grow z-10";

  const validChildren = getValidChildren(children);

  validChildren.forEach((child: any) => {
    switch (child.type.render.displayName) {
      case "InputLeftIcon": {
        inputStyles = clsx(inputStyles, "pl-10");
        break;
      }

      case "InputRightIcon": {
        inputStyles = clsx(inputStyles, "pr-10");
        break;
      }

      case "InputLeftAddon": {
        inputStyles = clsx(inputStyles, "rounded-l-none");
        break;
      }

      case "InputRightAddon": {
        inputStyles = clsx(inputStyles, "rounded-r-none");
        break;
      }
    }
  });

  const clones = validChildren.map((child: any) => {
    console.log(child);
    return child.type.render.displayName !== "Input"
      ? child
      : React.cloneElement(child, {
          className: clsx(inputStyles, child.props.className),
        });
  });

  return (
    <div ref={ref} className={merged} data-testid="input-group" {...rest}>
      {clones}
    </div>
  );
});

InputGroup.displayName = "InputGroup";
export default InputGroup;
