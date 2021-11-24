import Button from "@/components/Button/Button";
import Fallback from "@/components/Fallback/Fallback";
import FormControl from "@/components/FormControl/FormControl";
import IconButton from "@/components/IconButton/IconButton";
import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import UploadAvatar from "@/components/UploadAvatar/UploadAvatar";
import { blacklistedUsernames } from "@/utils/const";
import { definitions } from "@/utils/generated";
import { usernameReg } from "@/utils/regex";
import { supabase } from "@/utils/supabaseClient";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { useAuth } from "context/auth";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import logger from "@/utils/logger";

const Onboarding: NextPage = () => {
  const { user, error, loading } = useAuth();
  const router = useRouter();
  const currentUser = supabase.auth.user();

  const [profileId, setProfileId] = useState<"handle" | "misc">("handle");

  useEffect(() => {
    if (!loading && user && user.username !== null) {
      router.replace("/");
    }

    // eslint-disable-next-line
  }, [loading, error]);

  if (error === "NoUsername" && currentUser) {
    return (
      <div className="h-full sm:flex sm:flex-col sm:items-center sm:justify-center">
        {profileId === "handle" ? (
          <OnboardingHandleForm onFinish={() => setProfileId("misc")} />
        ) : (
          <OnboardingMiscForm id={profileId} />
        )}
      </div>
    );
  }

  return <Fallback />;
};

interface OnboardingHandleFormProps {
  onFinish: () => void;
}
const OnboardingHandleForm: React.FC<OnboardingHandleFormProps> = ({
  onFinish,
}) => {
  const currentUser = supabase.auth.user();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      displayName: "",
      username: "",
    },
  });

  const { logout, setUser, user } = useAuth();

  const onSubmit = async (data: { displayName: string; username: string }) => {
    try {
      if (blacklistedUsernames.includes(data.username)) {
        setError("username", {
          message: "Cant use that username",
          type: "validate",
        });
      }

      const updateProfile = await supabase
        .from<definitions["profiles"]>("profiles")
        .update({
          username: data.username,
          display_name: data.displayName,
        })
        .match({
          id: currentUser!.id,
        });

      if (updateProfile.data && user && setUser) {
        setUser({
          ...user,
          username: updateProfile.data[0].username,
          display_name: updateProfile.data[0].display_name,
        });
      } else {
        throw updateProfile.error;
      }

      onFinish();
    } catch (error) {
      logger.debug("Error occured: ", error);
      toast.error("Error occured.");
    }
  };

  return (
    <div className="w-full h-full bg-paper px-6 py-2 sm:shadow-flare sm:max-w-sm sm:rounded-lg sm:h-auto sm:pb-4">
      <IconButton
        aria-label="cancel"
        icon={<FiX />}
        variant="ghost"
        className="-ml-3"
        onClick={logout}
      />
      <header className="mb-4 flex flex-col">
        <Image
          src="/assets/logo_medium.png"
          alt=""
          width={120}
          height={120}
          objectFit="contain"
        />
        <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
        <div className="space-y-1 mt-2">
          <h2 className="text-lg">Let&apos;s decide the name</h2>
          <p className="text-gray-400 text-sm">
            A username is the @username other Flare users can use to find you. A
            name is the name visible to users on your profile. You can always
            change these later.
          </p>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl inValid={!!errors.displayName}>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            autoComplete="off"
            isFullWidth
            placeholder="Nickname"
            {...register("displayName", {
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
          {errors.displayName && (
            <span className="error">{errors.displayName.message}</span>
          )}
        </FormControl>
        <FormControl inValid={!!errors.username}>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            autoComplete="off"
            aria-label="username"
            isFullWidth
            placeholder="Username"
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

          {errors.username ? (
            <span className="error">{errors.username.message}</span>
          ) : (
            <p className="text-gray-400 text-sm mt-2">
              You can enter alphanumeric characters and underscore.
            </p>
          )}
        </FormControl>
        <Button
          isLoading={isSubmitting}
          className="mt-8"
          type="submit"
          color="primary"
          isFullWidth
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

interface OnboardingMiscFormProps {
  id: string;
}
const OnboardingMiscForm: React.FC<OnboardingMiscFormProps> = ({ id }) => {
  const currentUser = supabase.auth.user();
  const router = useRouter();
  const [finished, setFinished] = useState(false);
  const [tempPath, setTempPath] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      avatarUrl: currentUser!.user_metadata.avatar_url,
      bio: "",
      avatarFile: null as File | null,
    },
  });

  const onSubmit = async (data: {
    avatarUrl: string;
    bio: string;
    avatarFile: File | null;
  }) => {
    try {
      console.log(data);

      setFinished(true);
    } catch (error) {}
  };

  if (finished) {
    return <div>You&apos;re profile is all set up!</div>;
  }

  const handleCrop = (file: File) => {
    setValue("avatarFile", file);
    setTempPath(URL.createObjectURL(file));
  };

  const handleLeave = () => {
    router.replace("/");
  };

  return (
    <div className="w-full h-full bg-paper px-6 py-2 sm:shadow-main sm:max-w-sm sm:rounded-lg sm:h-auto sm:pb-4">
      <IconButton
        aria-label="cancel"
        icon={<FiX />}
        variant="ghost"
        className="-ml-3"
        onClick={handleLeave}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <UploadAvatar
          image={tempPath ?? currentUser!.user_metadata.avatar_url}
          handleUpload={handleCrop}
        />

        <FormControl inValid={!!errors.bio}>
          <label htmlFor="bio">Bio</label>
          <TextArea
            id="bio"
            autoComplete="off"
            isFullWidth
            rows={4}
            className="resize-none"
            placeholder="Bio"
            {...register("bio", {
              disabled: isSubmitting,
              maxLength: {
                message: "Maximum length can be up to 160 characters",
                value: 160,
              },
            })}
          />
          {errors.bio && <span className="error">{errors.bio.message}</span>}
        </FormControl>

        <Button
          isLoading={isSubmitting}
          className="mt-8"
          type="submit"
          color="primary"
          isFullWidth
        >
          Finish
        </Button>
      </form>
    </div>
  );
};

export default Onboarding;
