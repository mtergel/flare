import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/Tabs/Tabs";

interface EditorProps {
  markdown?: string | null;
  onChange?: (content: string) => void;
}
const Editor: React.FC<EditorProps> = () => {
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <Tabs defaultValue="write">
        <TabsList
          aria-label="Markdown editor tab write/preview"
          className="bg-base rounded-t-md md:pt-2"
        >
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write">
          <div>Editor here</div>
        </TabsContent>
        <TabsContent value="preview">
          <div>Preview here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
