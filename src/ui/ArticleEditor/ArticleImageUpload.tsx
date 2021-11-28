import Button from "@/components/Button/Button";
import { imageid } from "@/utils/ids";
import renameFile from "@/utils/renameFile";
import { supabase } from "@/utils/supabaseClient";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import imageCompression from "browser-image-compression";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import logger from "@/utils/logger";

interface ArticleImageUploadProps {
  user_id: string;
  onUpload: (url: string) => void;
}
const ArticleImageUpload: React.FC<ArticleImageUploadProps> = ({
  user_id,
  onUpload,
}) => {
  const [uploading, setUploading] = useState(false);
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const file = e.target.files[0];
      //   compressing
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const fileName = `${imageid()}.${compressedFile.name.split(".").pop()}`;
      const renamedFile = renameFile(compressedFile, fileName);
      const uploadRes = await supabase.storage
        .from("uploads")
        .upload(`${user_id}/${fileName}`, renamedFile);
      if (uploadRes.error) {
        logger.debug(uploadRes.error);
        toast.error("Error occured when uploading image.");
      } else {
        const { publicURL, error } = supabase.storage
          .from("uploads")
          .getPublicUrl(`${user_id}/${fileName}`);
        if (publicURL) {
          onUpload(publicURL);
        } else if (error) {
          logger.debug(error);
          toast.error("Error occured when getting public url.");
        }
      }

      setUploading(false);
    }
  };
  return (
    <label htmlFor="upload image to article">
      <input
        id="upload image to article"
        accept="image/png, image/gif, image/jpeg"
        type="file"
        className="hidden"
        onChange={handleUploadImage}
      />
      <Button
        isLoading={uploading}
        loadingText="Uploading"
        leftIcon={<FiImage />}
        variant="ghost"
        as="span"
      >
        Upload image
      </Button>
    </label>
  );
};

export default ArticleImageUpload;
