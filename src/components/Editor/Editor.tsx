import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs/Tabs";
import "codemirror-github-dark/lib/codemirror-github-dark-theme.css";
import "codemirror-github-light/lib/codemirror-github-light-theme.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import { useTheme } from "next-themes";
import { Controlled as CodeMirror } from "react-codemirror2";
import Preview from "./Preview";

interface EditorProps {
  markdown: string;
  onChange: (value: string) => void;
  title?: string | null;
}
const Editor: React.FC<EditorProps> = ({ markdown, onChange, title }) => {
  const { resolvedTheme } = useTheme();

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
          <CodeMirror
            value={markdown}
            onBeforeChange={(_editor, _data, value) => {
              onChange(value);
            }}
            className="md_editor"
            options={{
              mode: "markdown",
              theme: resolvedTheme === "light" ? "github-light" : "github-dark",
              lineNumbers: true,
              lineWrapping: true,
            }}
          />
        </TabsContent>
        <TabsContent value="preview">
          <div className="prose editor-preview-tw border-b-2">
            {markdown || title ? (
              <>
                <h1>{title}</h1>
                <Preview value={markdown} />
              </>
            ) : (
              <p>Nothing to preview.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
