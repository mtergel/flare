import { BiBold } from "@react-icons/all-files/bi/BiBold";
import { BiCode } from "@react-icons/all-files/bi/BiCode";
import { BiHeading } from "@react-icons/all-files/bi/BiHeading";
import { BiItalic } from "@react-icons/all-files/bi/BiItalic";
import { BiLink } from "@react-icons/all-files/bi/BiLink";
import { BiListOl } from "@react-icons/all-files/bi/BiListOl";
import { BiListUl } from "@react-icons/all-files/bi/BiListUl";
import { BiRedo } from "@react-icons/all-files/bi/BiRedo";
import { BiRightIndent } from "@react-icons/all-files/bi/BiRightIndent";
import { BiUndo } from "@react-icons/all-files/bi/BiUndo";
import { BiUnlink } from "@react-icons/all-files/bi/BiUnlink";
import { Editor } from "@tiptap/core";
import IconButton from "../IconButton/IconButton";

interface ToolbarProps {
  editor: Editor;
}

const size = "md";

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const handleLink = () => {
    const prevURL = editor.getAttributes("link").href;
    const url = window.prompt("URL", prevURL);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="menu">
      <IconButton
        variant="ghost"
        size={size}
        aria-label="heading"
        icon={<BiHeading />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="bold"
        icon={<BiBold />}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="italic"
        icon={<BiItalic />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="quote"
        icon={<BiRightIndent />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="code"
        icon={<BiCode />}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="link"
        icon={<BiLink />}
        onClick={() => handleLink()}
        className={editor.isActive("link") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="remove link"
        icon={<BiUnlink />}
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="bullet list"
        icon={<BiListUl />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="numbered list"
        icon={<BiListOl />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size={size}
        aria-label="undo"
        icon={<BiUndo />}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      />

      <IconButton
        variant="ghost"
        size={size}
        aria-label="redo"
        icon={<BiRedo />}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      />
    </div>
  );
};
export default Toolbar;
