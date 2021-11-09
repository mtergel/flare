import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import FormControl from "@/components/FormControl/FormControl";
import IconButton from "@/components/IconButton/IconButton";
import Input from "@/components/Input/Input";
import Slider from "@/components/Slider/Slider";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { useAuth } from "context/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import {
  GetUserByUsernameDocument,
  GetUserByUsernameQuery,
  GetUserByUsernameQueryVariables,
  useGetUserQuery,
  useUpdateUserMutation,
} from "graphql/generated/graphql";
import useDisclosure from "hooks/useDisclosure";
import { nanoid } from "nanoid";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";
import { useClient } from "urql";
import { getCroppedImg } from "utils/cropImage";
import logger from "utils/logger";
import { usernameReg } from "utils/regex";
import renameFile from "utils/renameFile";
import { NextPageWithLayout } from "utils/types";

const Settings: NextPageWithLayout = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <Fallback />;
  }

  if (!user) {
    // no user
    router.push("/");
    return null;
  } else {
    return (
      <div className="bg-paper h-full">
        <Info uid={user.uid} />
      </div>
    );
  }
};

const Info: React.FC<{ uid: string }> = ({ uid }) => {
  const [res] = useGetUserQuery({
    variables: {
      user_id: uid,
    },
  });

  if (res.fetching) {
    return <Fallback />;
  }

  if (res.error) {
    return (
      <div className="py-2">
        <ErrorMessage text={res.error.message} />
      </div>
    );
  }

  if (res.data && res.data.users_by_pk) {
    const user = res.data.users_by_pk;
    return (
      <Container size="small" className="py-12">
        <h1 className="text-4xl font-bold">Settings</h1>
        <div className="mt-12">
          <div className="block sm:flex sm:items-start sm:justify-between">
            <ChangeAvatar uid={uid} image={user.image} name={user.name} />
            <div className="mt-6 w-full sm:w-[calc(100%-150px)] sm:mt-0">
              <UserForm
                uid={uid}
                name={user.name}
                username={user.username!}
                bio={user.bio}
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return null;
};

interface UserFormProps {
  uid: string;
  name: string;
  username: string;
  bio?: string | null;
}
const UserForm: React.FC<UserFormProps> = ({ uid, name, username, bio }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      uid,
      name,
      username,
      bio,
    },
  });

  const client = useClient();
  const [_, updateUser] = useUpdateUserMutation();
  const onSubmit = async (data: UserFormProps) => {
    try {
      // check for usernames
      const res = await client
        .query<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(
          GetUserByUsernameDocument,
          {
            _eq: data.username,
          }
        )
        .toPromise();

      if (
        res.data?.users &&
        res.data.users.length > 0 &&
        res.data.users[0].username !== username
      ) {
        // user exists
        setError("username", {
          type: "value",
          message: "This username is already taken",
        });
      } else {
        await updateUser({
          user_id: uid,
          _set: {
            bio: data.bio,
            name: data.name,
            username: data.username,
          },
        });
        toast.success("Profile updated.");
      }
    } catch (error) {
      toast.error(error?.message || "Unexpected error occured");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <FormControl inValid={!!errors.name}>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          autoComplete="off"
          isFullWidth
          {...register("name", {
            disabled: isSubmitting,
            required: {
              message: "A name is required",
              value: true,
            },
            maxLength: {
              message: "Maximum length can be up to 50 characters",
              value: 50,
            },
          })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </FormControl>

      <FormControl inValid={!!errors.bio}>
        <label htmlFor="bio">Bio</label>
        <Input
          id="bio"
          autoComplete="off"
          isFullWidth
          {...register("bio", {
            disabled: isSubmitting,
            required: {
              message: "A bio is required",
              value: true,
            },
            maxLength: {
              message: "Maximum length can be up to 150 characters",
              value: 150,
            },
          })}
        />
        {errors.bio && <span className="error">{errors.bio.message}</span>}
      </FormControl>

      <FormControl inValid={!!errors.username}>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          autoComplete="off"
          isFullWidth
          {...register("username", {
            disabled: isSubmitting,
            required: {
              message: "An username is required",
              value: true,
            },
            maxLength: {
              message: "Maximum length can be up to 15 characters",
              value: 15,
            },
            minLength: {
              message: "Minimum character limit is 4",
              value: 4,
            },
            pattern: {
              message:
                "Only alphanumeric characters and underscore are allowed.",
              value: usernameReg,
            },
          })}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </FormControl>

      <div className="py-4 flex items-center justify-center">
        <Button type="submit" color="primary" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};

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

interface ImageCropProps {
  image: string;
  onFinish: (base64: string) => any;
}
const ImageCrop: React.FC<ImageCropProps> = ({ image, onFinish }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = useCallback(async () => {
    const baseString = await getCroppedImg(image, croppedAreaPixels);
    onFinish(baseString);
  }, [croppedAreaPixels, image, onFinish]);

  return (
    <div>
      <div className="w-[300px] h-[300px] relative bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          onCropComplete={onCropComplete}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          objectFit="vertical-cover"
        />
      </div>
      <div>
        <div className="bg-paper p-4">
          <Slider
            min={1}
            max={4}
            step={0.5}
            onValueChange={(val) => setZoom(val[0])}
            name="zoom"
            value={[zoom]}
          />
        </div>
        <div className="bg-base flex items-center justify-center py-4">
          <Button color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

Settings.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Settings;
