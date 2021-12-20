import { cloudinaryUrl } from "@/utils/const";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import clsx from "clsx";
import { forwardRef } from "react";

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.AvatarImage> {
  fallback?: string;
  size?: SizeVariant;
  disableCDN?: boolean;
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
  const {
    className,
    fallback,
    size,
    shadow,
    children,
    src,
    disableCDN,
    ...itemProps
  } = props;
  const mergedRoot = clsx("avatar", getSize(size), shadow && "avatar-shadow");

  const getSrc = () => {
    if (!disableCDN) {
      const base = cloudinaryUrl;
      switch (size) {
        case "sm":
          return `${base}` + `/fetch/w_32,h_32,c_scale/${src}`;
        case "md": {
          return `${base}` + `/fetch/w_40,h_40,c_scale/${src}`;
        }
        case "lg":
          return `${base}` + `/fetch/w_56,h_56,c_scale/${src}`;
        case "profile":
          return `${base}` + `/fetch/${src}`;
        default:
          return `${base}` + `/fetch/w_40,h_40,c_scale/${src}`;
      }
    } else return src;
  };
  // https://res.cloudinary.com/demo/image/upload/w_70,h_53,c_scale/turtles.jpg
  return (
    <AvatarPrimitive.Root
      className={mergedRoot}
      ref={forwardRef}
      data-testid="avatar"
    >
      <AvatarPrimitive.Image
        {...itemProps}
        src={getSrc()}
        alt={fallback}
        data-testid="avatar-image"
      />
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
