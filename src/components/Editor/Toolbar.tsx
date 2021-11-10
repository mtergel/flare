import { Editor } from "@tiptap/core";
import IconButton from "../IconButton/IconButton";
import { BiHeading } from "@react-icons/all-files/bi/BiHeading";
import { BiBold } from "@react-icons/all-files/bi/BiBold";
import { BiItalic } from "@react-icons/all-files/bi/BiItalic";
import { BiRightIndent } from "@react-icons/all-files/bi/BiRightIndent";
import { BiCode } from "@react-icons/all-files/bi/BiCode";
import { BiLink } from "@react-icons/all-files/bi/BiLink";
import { BiUnlink } from "@react-icons/all-files/bi/BiUnlink";
import { BiListUl } from "@react-icons/all-files/bi/BiListUl";
import { BiListOl } from "@react-icons/all-files/bi/BiListOl";

interface ToolbarProps {
  editor: Editor;
}
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
        size="sm"
        aria-label="heading"
        icon={<BiHeading />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="bold"
        icon={<BiBold />}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="italic"
        icon={<BiItalic />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="quote"
        icon={<BiRightIndent />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="code"
        icon={<BiCode />}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="code"
        icon={<BiCode />}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="link"
        icon={<BiLink />}
        onClick={() => handleLink()}
        className={editor.isActive("link") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="remove link"
        icon={<BiUnlink />}
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="bullet list"
        icon={<BiListUl />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      />
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="numbered list"
        icon={<BiListOl />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      />
    </div>
  );
};
export default Toolbar;
