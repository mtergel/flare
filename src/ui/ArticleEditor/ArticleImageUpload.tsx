import Button from "@/components/Button/Button";
import imageid from "@/utils/imageid";
import logger from "@/utils/logger";
import renameFile from "@/utils/renameFile";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import imageCompression from "browser-image-compression";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

interface ArticleImageUploadProps {
  onUpload: (url: string) => void;
}
const ArticleImageUpload: React.FC<ArticleImageUploadProps> = ({
  onUpload,
}) => {
  // auto deleting bucket
  const storage = getStorage(undefined, "gs://flare-articles");

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
        fileType: "image/jpeg", // override to jpeg?
      });

      // rename to random nanoid
      const newName = `${imageid()}.jpeg`;
      const renamedFile = renameFile(compressedFile, newName);

      // remove this
      onUpload("https://images.unsplash.com/photo-1480796927426-f609979314bd");
      setUploading(false);

      // const storageRef = ref(storage, newName);

      // try {
      //   // uploading
      //   const res = await uploadBytes(storageRef, renamedFile, {});
      //   const url = await getDownloadURL(res.ref);

      //   // callback
      //   onUpload(url);
      //   setUploading(false);
      // } catch (error) {
      //   setUploading(false);
      //   logger.debug("Error uploading image: ", error);
      //   if (error.code === "storage/unauthorized") {
      //     toast.error("Maximum size limit is 5MB.");
      //   }
      // }
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
