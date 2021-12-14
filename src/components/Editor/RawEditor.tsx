import { lineNumbers } from "@codemirror/gutter";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, placeholder, ViewUpdate } from "@codemirror/view";
import clsx from "clsx";
import { useEffect, useRef } from "react";

interface RawEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disableLineNumber?: boolean;
  placeholderString?: string;
}

const RawEditor: React.FC<RawEditorProps> = ({
  value,
  onChange,
  className,
  disableLineNumber,
  placeholderString,
}) => {
  const merged = clsx("md_editor", className);
  const editor = useRef<HTMLDivElement>(null);

  const handleUpdate = (update: ViewUpdate) => {
    onChange(update.state.doc.toJSON().join("\n"));
  };

  useEffect(() => {
    const extensions: Extension[] = [EditorView.lineWrapping];
    if (placeholderString) extensions.push(placeholder(placeholderString));
    if (!disableLineNumber) extensions.push(lineNumbers());
    extensions.push(EditorView.updateListener.of(handleUpdate));

    const state = EditorState.create({
      doc: value,
      extensions,
    });
    const view = new EditorView({
      state,
      parent: editor.current!,
    });

    return () => view.destroy();
  }, [editor]);

  return <div ref={editor} className={merged} />;
};

export default RawEditor;
