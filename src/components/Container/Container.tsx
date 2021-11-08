import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";

interface ContainerOptions {
  size?: "wide" | "common";
}
const getSize = (size?: "wide" | "common") => {
  switch (size) {
    case "wide":
      return "wide";
    case "common": {
      return "common";
    }
    default:
      return "common";
  }
};

type Ref = HTMLDivElement;

export type ContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ContainerOptions;

const Container = forwardRef<Ref, ContainerProps>((props, ref) => {
  const { className, size, children, ...rest } = props;

  const merged = clsx(className, "container-base", getSize(size));

  return (
    <div ref={ref} {...rest} className={merged} data-testid="container">
      {children}
    </div>
  );
});

Container.displayName = "Container";
export default Container;
