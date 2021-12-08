import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps extends TooltipPrimitive.TooltipProps {
  content: any;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { open, defaultOpen, onOpenChange, children, content, ...rest } = props;
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={300}
      {...rest}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side="top"
        align="center"
        className="tooltip-content"
      >
        {content}
        <TooltipPrimitive.Arrow
          offset={5}
          width={11}
          height={5}
          className="tooltip-arrow"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};

export default Tooltip;
