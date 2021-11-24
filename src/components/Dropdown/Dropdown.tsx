import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import React, { forwardRef } from "react";
import clsx from "clsx";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuContent>,
  React.ComponentProps<typeof DropdownMenuPrimitive.DropdownMenuContent>
>(({ children, className, ...rest }, forwardedRef) => {
  const merged = clsx("dropdown-content", className);
  return (
    <DropdownMenuPrimitive.Content
      {...rest}
      className={merged}
      ref={forwardedRef}
    >
      {children}
      <DropdownMenuPrimitive.Arrow className="dropdown-arrow" offset={15} />
    </DropdownMenuPrimitive.Content>
  );
});

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuLabel>,
  React.ComponentProps<typeof DropdownMenuPrimitive.DropdownMenuLabel>
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Label
      {...props}
      className="dropdown-label"
      ref={forwardedRef}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
});
export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    color?: "danger" | "primary";
  }
>(({ children, className, color, ...props }, forwardedRef) => {
  const merged = clsx(
    "dropdown-item",
    color === "danger" && "dropdown-item-danger",
    color === "primary" && "dropdown-item-primary",
    className
  );
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      className={merged}
      ref={forwardedRef}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
});

export const DropdownMenuGroup = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentProps<typeof DropdownMenuPrimitive.Group>
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Group
      {...props}
      className="dropdown-group"
      ref={forwardedRef}
    >
      {children}
    </DropdownMenuPrimitive.Group>
  );
});

export const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuCheckboxItem>,
  React.ComponentProps<typeof DropdownMenuPrimitive.DropdownMenuCheckboxItem>
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem {...props} ref={forwardedRef}>
      {children}
      <DropdownMenuPrimitive.ItemIndicator>
        <FiCheck />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

export const DropdownMenuRadioGroup = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
  React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
>(({ children, className, ...props }, forwardedRef) => {
  const merged = clsx("dropdown-radio", className);
  return (
    <DropdownMenuPrimitive.RadioGroup
      {...props}
      className={merged}
      ref={forwardedRef}
    >
      {children}
    </DropdownMenuPrimitive.RadioGroup>
  );
});

export const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuRadioItem>,
  React.ComponentProps<typeof DropdownMenuPrimitive.DropdownMenuRadioItem>
>(({ children, className, ...props }, forwardedRef) => {
  const merged = clsx("dropdown-radio-item", className);
  return (
    <DropdownMenuPrimitive.RadioItem
      {...props}
      className={merged}
      ref={forwardedRef}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="dropdown-radio-icon">
        <FiCheck />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.RadioItem>
  );
});

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentProps<typeof DropdownMenuPrimitive.Separator>
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Separator
      {...props}
      className="dropdown-separator"
      ref={forwardedRef}
    >
      {children}
    </DropdownMenuPrimitive.Separator>
  );
});

export const DropdownMenuLeftSlot: React.FC<{}> = ({ children }) => {
  return <div className="dropdown-item-left-slot">{children}</div>;
};
DropdownMenuContent.displayName = "DropdownMenuContent";
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
DropdownMenuLabel.displayName = "DropdownMenuLabel";
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
DropdownMenuItem.displayName = "DropdownMenuItem";
DropdownMenuGroup.displayName = "DropdownMenuGroup";
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";
DropdownMenuLeftSlot.displayName = "DropdownMenuLeftSlot";
