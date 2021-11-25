import Button from "@/components/Button/Button";
import FormControl from "@/components/FormControl/FormControl";
import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import UploadAvatar from "@/components/UploadAvatar/UploadAvatar";
import { definitions } from "@/utils/generated";
import { usernameReg } from "@/utils/regex";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import logger from "@/utils/logger";
import { blacklistedUsernames } from "@/utils/const";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "context/auth";

interface UserFormProps {
  user: definitions["profiles"];
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      displayName: user.display_name,
      username: user.username,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      avatarFile: null as File | null,
    },
  });
  const [tempPath, setTempPath] = useState<string | undefined>();
  const { setUser } = useAuth();

  const onSubmit = async (data: {
    displayName: string;
    username: string;
    avatarUrl: string;
    bio: string;
    avatarFile: File | null;
  }) => {
    try {
      if (blacklistedUsernames.includes(data.username)) {
        setError("username", {
          message: "Username exists",
          type: "validate",
        });
      } else {
        let currentURL = data.avatarUrl;
        if (data.avatarFile) {
          // upload file
          const fileName = data.avatarFile.name;
          const uploadResult = await supabase.storage
            .from("avatar")
            .upload(`${user.id}/${fileName}`, data.avatarFile, {
              upsert: true,
            });
          if (uploadResult.error) {
            throw uploadResult.error;
          }

          if (
            data.avatarUrl.includes(
              "https://anyqfjvtgmdymcwdoeac.supabase.co/storage/v1/object/public/avatar/"
            )
          ) {
            // try to delete the old file
            try {
              const path = data.avatarUrl.replace(
                "https://anyqfjvtgmdymcwdoeac.supabase.co/storage/v1/object/public/avatar/",
                ""
              );
              await supabase.storage.from("avatar").remove([path]);
            } catch (error) {
              logger.debug("cant delete: ", data.avatarUrl);
            }
          }

          // get full path
          const { publicURL, error } = supabase.storage
            .from("avatar")
            .getPublicUrl(`${user.id}/${fileName}`);
          if (publicURL) {
            currentURL = publicURL;
          } else if (error) {
            throw error;
          }
        }
        const updateProfile = await supabase
          .from<definitions["profiles"]>("profiles")
          .update({
            username: data.username,
            display_name: data.displayName,
            bio: data.bio,
            avatar_url: currentURL,
          })
          .match({
            id: user.id,
          });

        if (updateProfile.data && user && setUser) {
          setUser(updateProfile.data[0]);
        } else {
          throw updateProfile.error;
        }

        reset({
          avatarFile: null,
          avatarUrl: updateProfile.data[0].avatar_url,
          bio: updateProfile.data[0].bio,
          displayName: updateProfile.data[0].display_name,
          username: updateProfile.data[0].username,
        });

        toast.success("Profile updated.");
      }
    } catch (error) {
      logger.debug("Error occured: ", error);
      toast.error("Error occured.");
    }
    console.log(data);
  };

  const handleCrop = (file: File) => {
    setValue("avatarFile", file);
    setTempPath(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div>
          <UploadAvatar
            image={tempPath ?? user.avatar_url}
            name={user.display_name}
            handleUpload={handleCrop}
          />
        </div>

        <div className="sm:w-[calc(100%-150px)]">
          <FormControl inValid={!!errors.displayName}>
            <label htmlFor="name">
              Name
              <span className="form-label-required">*</span>
            </label>
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
            <label htmlFor="username">
              Username
              <span className="form-label-required">*</span>
            </label>
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

          <p className="text-sm text-gray-500 mt-4">
            These changes will be displayed on your profile.
          </p>

          <div className="mt-8 text-center">
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Save Info
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
