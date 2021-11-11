import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import clsx from "clsx";
import IconButton from "@/components/IconButton/IconButton";
import { FiX } from "@react-icons/all-files/fi/FiX";

interface DialogProps {
  title: string;
  description?: string;
  content: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showInfo?: boolean;
  contentClassname?: string;
}
const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  description,
  content,
  open,
  defaultOpen,
  onOpenChange,
  showInfo,
  contentClassname,
}) => {
  const merged = clsx("dialog-content", contentClassname);

  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <DialogPrimitive.Overlay className="dialog-overlay" />
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Content className={merged}>
        <DialogPrimitive.Title
          className={clsx("dialog-title", !showInfo && "invisible h-0")}
        >
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description
          className={clsx(
            "dialog-description",
            !showInfo ? "invisible h-0" : "my-5"
          )}
        >
          {description}
        </DialogPrimitive.Description>
        {content}
        <DialogPrimitive.Close asChild>
          <IconButton
            className="absolute top-3 right-3"
            variant="ghost"
            aria-label="cross"
            icon={<FiX />}
          />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
};

const DialogClose = DialogPrimitive.Close;
export { DialogClose };
export default Dialog;
