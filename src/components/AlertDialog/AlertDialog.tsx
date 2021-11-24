import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import clsx from "clsx";
import { forwardRef } from "react";

interface AlertDialogProps {
  title: string;
  actions: React.ReactNode;
  description?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  actions,
  description,
  children,
  open,
  defaultOpen,
  onOpenChange,
}) => {
  return (
    <AlertDialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <AlertDialogPrimitive.Overlay className="dialog-overlay" />
      <AlertDialogPrimitive.Trigger asChild>
        {children}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Content className="alert-content">
        <div className="flex-grow">
          <AlertDialogPrimitive.Title className="alert-title">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="alert-description">
            {description}
          </AlertDialogPrimitive.Description>
        </div>

        {actions}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Root>
  );
};

export const AlertActionButton = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.AlertDialogAction>,
  React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogAction>
>(({ children, className, ...props }, forwardedRef) => {
  const merged = clsx("alert-button", className);
  return (
    <AlertDialogPrimitive.AlertDialogAction
      {...props}
      className={merged}
      ref={forwardedRef}
    >
      {children}
    </AlertDialogPrimitive.AlertDialogAction>
  );
});

AlertActionButton.displayName = "AlertActionButton";
export const AlertCancelButton = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.AlertDialogCancel>,
  React.ComponentProps<typeof AlertDialogPrimitive.AlertDialogCancel>
>(({ children, className, ...props }, forwardedRef) => {
  const merged = clsx("alert-button", className);
  return (
    <AlertDialogPrimitive.AlertDialogCancel
      {...props}
      className={merged}
      ref={forwardedRef}
    >
      {children}
    </AlertDialogPrimitive.AlertDialogCancel>
  );
});

AlertCancelButton.displayName = "AlertCancelButton";
