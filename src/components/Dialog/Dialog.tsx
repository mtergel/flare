import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface DialogProps {
  title: string;
  description?: string;
  content: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  description,
  content,
  open,
  defaultOpen,
  onOpenChange,
}) => {
  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <DialogPrimitive.Overlay className="dialog-overlay" />
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Content className="dialog-content">
        <DialogPrimitive.Title className="dialog-title">
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description className="dialog-description">
          {description}
        </DialogPrimitive.Description>
        {content}
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
};

const DialogClose = DialogPrimitive.Close;
export { DialogClose };
export default Dialog;
