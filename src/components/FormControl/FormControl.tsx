import clsx from "clsx";
import React, { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

interface FormControlOptions {
  inValid?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
}

type Ref = HTMLDivElement;

export type FormControlProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FormControlOptions;

const FormControl = forwardRef<Ref, FormControlProps>((props, ref) => {
  const { className, inValid, isFullWidth = true, children, ...rest } = props;
  const merged = clsx(
    className,
    "form-control",
    inValid && "form-error",
    isFullWidth && "w-full"
  );

  return (
    <div ref={ref} {...rest} className={merged}>
      {children}
    </div>
  );
});

FormControl.displayName = "FormControl";
export default FormControl;
