import clsx from "clsx";
import React, { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

interface SkeletonOptions<E extends React.ElementType = React.ElementType> {
  as?: E;
}

type Ref = HTMLDivElement;
type SkeletonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  SkeletonOptions;

/**
 * General use skeleton component
 * will render an div element by default
 */
const Skeleton = forwardRef<Ref, SkeletonProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const Element = rest.as || "div";
  const merged = clsx("skeleton", className);

  return (
    <Element ref={ref} {...rest} className={merged} data-testid="skeleton">
      {children}
    </Element>
  );
});

Skeleton.displayName = "Skeleton";
export default Skeleton;
