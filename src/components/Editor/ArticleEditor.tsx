import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockComponent from "./CodeBlockComponent";
// @ts-ignore
import { lowlight } from "lowlight";
import Toolbar from "./Toolbar";
import Fallback from "../Fallback/Fallback";
import Button from "../Button/Button";
import Link from "@tiptap/extension-link";

const ArticleEditor: React.FC<{}> = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
    content: `
      <h1>
        Hi there,
      </h1>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
      {
        if (i % 15 == 0)
          console.log("FizzBuzz");
        else if (i % 3 == 0)
          console.log("Fizz");
        else if (i % 5 == 0)
          console.log("Buzz");
        else
          console.log(i);
      }</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
  });

  if (editor) {
    return (
      <div className="editor">
        <Toolbar editor={editor} />
        <div className="content">
          <EditorContent className="prose" editor={editor} />
        </div>
        <div className="flex items-center justify-end pt-4 pb-2">
          <Button color="primary">Save</Button>
        </div>
      </div>
    );
  } else {
    return <Fallback />;
  }
};

export default ArticleEditor;
