import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs/Tabs";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

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
  autosave: {
    enabled: true,
    delay: 1000,
    uniqueId: "new-article",
  },
} as EasyMDE.Options;

interface EditorProps {
  markdown?: string | null;
  onChange?: (content: string) => void;
}
const Editor: React.FC<EditorProps> = () => {
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
          <SimpleMDE id="md-editor" options={options} />
        </TabsContent>
        <TabsContent value="preview">
          <div>Preview here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
