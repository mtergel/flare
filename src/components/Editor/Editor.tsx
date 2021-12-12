import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs/Tabs";
import dynamic from "next/dynamic";
import { useState } from "react";

const RawEditor = dynamic(() => import("./RawEditor"), {
  ssr: false,
  loading: () => <p className="text-sm">Loading...</p>,
});
const Preview = dynamic(() => import("./Preview"), {
  ssr: false,
  loading: () => <p className="text-sm">Loading...</p>,
});

interface EditorProps {
  markdown: string;
  onChange: (value: string) => void;
  title?: string | null;
}
const Editor: React.FC<EditorProps> = ({ markdown, onChange, title }) => {
  const [editorState, setEditorState] = useState<"write" | "preview">("write");

  return (
    <>
      <Tabs
        value={editorState}
        onValueChange={(val) => setEditorState(val as "write" | "preview")}
        className="sticky top-0 z-20"
      >
        <TabsList
          aria-label="Markdown editor tab write/preview"
          className="bg-base md:pt-2"
        >
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
      </Tabs>
      {editorState === "write" ? (
        <RawEditor value={markdown} onChange={onChange} />
      ) : (
        <div className="prose dark:prose-invert editor-preview-tw border-b-2">
          {markdown || title ? (
            <>
              <h1>{title}</h1>
              <Preview value={markdown} />
            </>
          ) : (
            <p>Nothing to preview.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Editor;
