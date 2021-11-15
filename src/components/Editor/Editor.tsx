import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs/Tabs";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import Preview from "./Preview";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const options = {
  autofocus: false,
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
          <div className="prose editor-preview-tw border-b-2">
            {value ? <Preview value={value} /> : <p>Nothing to preview.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
