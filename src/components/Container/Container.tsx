import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";

interface ContainerOptions {
  isWide?: boolean;
}

type Ref = HTMLDivElement;

export type ContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ContainerOptions;

const Container = forwardRef<Ref, ContainerProps>((props, ref) => {
  const { className, isWide, children, ...rest } = props;

  const merged = clsx(className, "container-base", isWide && "wide");

  return (
    <div ref={ref} {...rest} className={merged} data-testid="container">
      {children}
    </div>
  );
});

Container.displayName = "Container";
export default Container;
