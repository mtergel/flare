import { previewProcessor } from "@/utils/markdownProcessor";
import { useEffect, useState } from "react";

import Fallback from "../Fallback/Fallback";

interface PreviewProps {
  value: string;
}

const Preview: React.FC<PreviewProps> = ({ value }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateMD = async () => {
      setLoading(true);

      setContent(String(await previewProcessor.process(value)));

      setLoading(false);
    };

    generateMD();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Fallback />;
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Preview;
