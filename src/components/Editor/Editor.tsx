import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// @ts-ignore
import { lowlight } from "lowlight";
import Fallback from "../Fallback/Fallback";
import CodeBlockComponent from "./CodeBlockComponent";
import Toolbar from "./Toolbar";

interface EditorProps {
  content?: string | null;
  onChange?: (content: string) => void;
}
const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [2, 3, 4, 5, 6],
        },
      }),
      Link,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
    content: content ?? undefined,
    onUpdate: (props) => {
      if (onChange) {
        onChange(props.editor.getHTML());
      }
    },
  });

  if (editor) {
    return (
      <div className="editor">
        <Toolbar editor={editor} />
        <div className="content">
          <EditorContent spellCheck={false} className="prose" editor={editor} />
        </div>
      </div>
    );
  } else {
    return <Fallback />;
  }
};

export default Editor;
