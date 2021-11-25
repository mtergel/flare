import useDisclosure from "hooks/useDisclosure";
import { ChangeEvent, useState } from "react";
import Avatar from "../Avatar/Avatar";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FiX } from "@react-icons/all-files/fi/FiX";
import IconButton from "../IconButton/IconButton";
import ImageAvatarCrop from "./ImageAvatarCrop";

interface UploadAvatarProps {
  /**
   * @param file File
   * randomly named jpeg, minified image 480x480
   */
  handleUpload: (file: File) => void;
  /**
   * image to show on avatar
   */
  image?: string;
  /**
   * image alt text, fallback text
   */
  name?: string;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({
  image,
  name,
  handleUpload,
}) => {
  // temporary path for selected image from input
  const [path, setPath] = useState<string | undefined>();
  const { isOpen, onOpen, onClose, setIsOpen } = useDisclosure();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPath(URL.createObjectURL(file));
      onOpen();
    }
  };

  const _handleUpload = async (file: File) => {
    onClose();
    handleUpload(file);
  };

  return (
    <div>
      <label htmlFor="picture" className="text-center block cursor-pointer">
        <input
          id="picture"
          accept="image/png, image/gif, image/jpeg"
          type="file"
          className="hidden"
          onChange={handleChange}
        />
        <Avatar
          size="profile"
          src={image ?? undefined}
          fallback={name ?? "avatar"}
          referrerPolicy="no-referrer"
          shadow
        />
        <div
          tabIndex={0}
          className="text-gray-400 text-sm mt-2 flex items-center justify-center"
        >
          Change
        </div>
      </label>
      {isOpen && path && (
        <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <DialogPrimitive.Overlay className="dialog-overlay" />
          <DialogPrimitive.Content className="rounded-lg overflow-hidden fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <ImageAvatarCrop image={path} onFinish={_handleUpload} />
            <DialogPrimitive.Close asChild>
              <IconButton
                className="absolute top-3 right-3 bg-paper rounded-full"
                aria-label="cross"
                icon={<FiX />}
              />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Root>
      )}
    </div>
  );
};

export default UploadAvatar;
