import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs/Tabs";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const options = {
  autofocus: true,
  spellChecker: false,
  placeholder: "Write your post content here...",
  toolbar: [],
  autoDownloadFontAwesome: false,
  status: false,
  styleSelectedText: false,
} as EasyMDE.Options;

interface EditorProps {
  markdown: string;
  onChange: (value: string) => void;
}
const Editor: React.FC<EditorProps> = ({ markdown, onChange }) => {
  const [value, setValue] = useState(markdown);

  const handleChange = useCallback((value: string) => {
    setValue(value);
    onChange(value);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="editor-container">
      <Tabs defaultValue="write">
        <TabsList
          aria-label="Markdown editor tab write/preview"
          className="bg-base md:rounded-t-md md:pt-2"
        >
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <SimpleMDE
            id="md-editor"
            options={options}
            value={value}
            onChange={handleChange}
          />
        </TabsContent>
        <TabsContent value="preview">
          <div className="prose prose-sm editor-preview-tw">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    // @ts-ignore
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {value}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
