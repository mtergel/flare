import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextAreaOptions {
  className?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
}

type Ref = HTMLTextAreaElement;

export type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  TextAreaOptions;

const TextArea = forwardRef<Ref, TextAreaProps>((props, ref) => {
  const { className, isDisabled, isFullWidth, children, ...rest } = props;

  const merged = clsx(className, "textarea", isFullWidth && "textarea-full");

  return (
    <textarea
      ref={ref}
      disabled={isDisabled}
      {...rest}
      className={merged}
      data-testid="TextArea"
    >
      {children}
    </textarea>
  );
});

TextArea.displayName = "TextArea";
export default TextArea;
