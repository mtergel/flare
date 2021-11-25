import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef } from "react";
import clsx from "clsx";

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.AvatarImage> {
  fallback?: string;
  size?: SizeVariant;
  shadow?: boolean;
}

type SizeVariant = "sm" | "md" | "lg" | "profile";

const getSize = (size?: SizeVariant) => {
  switch (size) {
    case "sm":
      return "avatar-sm";
    case "md": {
      return "avatar-md";
    }
    case "lg":
      return "avatar-lg";
    case "profile":
      return "avatar-profile";
    default:
      return "avatar-md";
  }
};

const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>((props, forwardRef) => {
  const { className, fallback, size, shadow, children, ...itemProps } = props;
  const mergedRoot = clsx("avatar", getSize(size), shadow && "avatar-shadow");
  return (
    <AvatarPrimitive.Root
      className={mergedRoot}
      ref={forwardRef}
      data-testid="avatar"
    >
      <AvatarPrimitive.Image {...itemProps} data-testid="avatar-image" />
      <AvatarPrimitive.Fallback
        delayMs={600}
        className="fallback"
        data-testid="afallback"
      >
        {fallback ? fallback[0] : fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
});

Avatar.displayName = "Avatar";
export default Avatar;
