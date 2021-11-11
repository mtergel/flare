import { forwardRef } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import clsx from "clsx";

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: SizeVariant;
}

type SizeVariant = "sm" | "md" | "lg";

const getSize = (size?: SizeVariant) => {
  switch (size) {
    case "sm":
      return "switch-sm";
    case "md": {
      return "switch-md";
    }
    case "lg":
      return "switch-lg";
    default:
      return "switch-md";
  }
};

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>((props, forwardRef) => {
  const { className, size, ...rest } = props;
  const sizeClass = getSize(size);
  const merged = clsx("switch", sizeClass, className);
  return (
    <SwitchPrimitive.Root ref={forwardRef} className={merged} {...rest}>
      <SwitchPrimitive.Thumb className={clsx("switch-thumb", sizeClass)} />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";
export default Switch;
