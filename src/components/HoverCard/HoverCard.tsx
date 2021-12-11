import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import clsx from "clsx";
import { ReactNode } from "react";

interface HoverCardProps {
  content: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassname?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({
  open,
  defaultOpen,
  onOpenChange,
  content,
  contentClassname,
  children,
}) => {
  const merged = clsx("hovercard-content", contentClassname);

  return (
    <HoverCardPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <HoverCardPrimitive.Trigger asChild>
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content sideOffset={2} className={merged}>
        {content}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

export default HoverCard;
