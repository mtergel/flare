import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";
import clsx from "clsx";

export const Tabs = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentProps<typeof TabsPrimitive.Root>
>((props, forwardedRef) => {
  const { children, className, ...rest } = props;
  return (
    <TabsPrimitive.Root
      {...rest}
      className={clsx("tabs", className)}
      ref={forwardedRef}
    >
      {children}
    </TabsPrimitive.Root>
  );
});

Tabs.displayName = "Tabs";

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.TabsList>,
  React.ComponentProps<typeof TabsPrimitive.TabsList>
>((props, forwardedRef) => {
  const { children, className, ...rest } = props;
  return (
    <TabsPrimitive.TabsList
      {...rest}
      className={clsx("tabs-list", className)}
      ref={forwardedRef}
    >
      {children}
    </TabsPrimitive.TabsList>
  );
});

TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.TabsTrigger>,
  React.ComponentProps<typeof TabsPrimitive.TabsTrigger>
>((props, forwardedRef) => {
  const { children, className, ...rest } = props;
  return (
    <TabsPrimitive.TabsTrigger
      {...rest}
      className={clsx(className, "tabs-trigger")}
      ref={forwardedRef}
    >
      {children}
    </TabsPrimitive.TabsTrigger>
  );
});

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.TabsContent>,
  React.ComponentProps<typeof TabsPrimitive.TabsContent>
>((props, forwardedRef) => {
  const { children, className, ...rest } = props;
  return (
    <TabsPrimitive.TabsContent
      {...rest}
      className={clsx(className, "tabs-content")}
      ref={forwardedRef}
    >
      {children}
    </TabsPrimitive.TabsContent>
  );
});

TabsContent.displayName = "TabsContent";
