import Avatar from "@/components/Avatar/Avatar";
import IconButton from "@/components/IconButton/IconButton";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FiX } from "@react-icons/all-files/fi/FiX";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { useUpdateUserMutation } from "graphql/generated/graphql";
import useDisclosure from "hooks/useDisclosure";
import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import ImageCrop from "ui/Settings/ImageCrop";
import logger from "utils/logger";
import renameFile from "utils/renameFile";

interface ChangeAvatarProps {
  uid: string;
  image?: string | null;
  name?: string | null;
}
const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ uid, image, name }) => {
  const [path, setPath] = useState<string | null>(null);
  const { isOpen, onOpen, onClose, setIsOpen } = useDisclosure();
  const storage = getStorage();
  const storageRef = ref(storage, `avatar/${uid}.jpeg`);

  const [_, updateUser] = useUpdateUserMutation();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const extension = e.target.files[0].name.split(".").pop();
      const name = `${nanoid()}.${extension}`;
      const file = renameFile(e.target.files[0], name);
      setPath(URL.createObjectURL(file));
      onOpen();
    }
  };

  const uploadImage = async (base64: string) => {
    try {
      const _base64 = base64.replace("data:image/jpeg;base64,", "");

      await uploadString(storageRef, _base64, "base64", {
        contentType: "image/jpeg",
      });

      const url = await getDownloadURL(storageRef);
      await updateUser({
        user_id: uid,
        _set: {
          image: url,
        },
      });
    } catch (error) {
      logger.debug("Error uploading/saving image: ", error);
      if (error.code === "storage/unauthorized") {
        toast.error("Maximum size limit is 1MB.");
      }
      throw error;
    }
  };

  const handleUpload = (base64: string) => {
    onClose();
    toast.promise(uploadImage(base64), {
      loading: "Uploading...",
      success: <b>Uploaded!</b>,
      error: <p>Could not save.</p>,
    });
  };

  return (
    <>
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
          src={image || undefined}
          fallback={name || uid}
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
            <ImageCrop image={path} onFinish={handleUpload} />
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
    </>
  );
};

export default ChangeAvatar;
