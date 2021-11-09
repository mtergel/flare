import Button from "@/components/Button/Button";
import FormControl from "@/components/FormControl/FormControl";
import Input from "@/components/Input/Input";
import {
  GetUserByUsernameDocument,
  GetUserByUsernameQuery,
  GetUserByUsernameQueryVariables,
  useUpdateUserMutation,
} from "graphql/generated/graphql";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useClient } from "urql";
import { usernameReg } from "utils/regex";
interface OnboardinFormProps {
  uid: string;
  displayName: string;
  handle: string;
}
const OnboardinForm: React.FC<OnboardinFormProps> = ({
  uid,
  handle,
  displayName,
}) => {
  const router = useRouter();
  // rules
  // 15 chars
  // allowed chars A-Z a-z 0-9 _
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: displayName,
      username: handle,
    },
  });

  //   URQL client
  const client = useClient();
  const [result, updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: { name: string; username: string }) => {
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

      if (res.data?.users && res.data.users.length > 0) {
        // user exists
        setError("username", {
          type: "value",
          message: "This username is already taken",
        });
      } else {
        await updateUser({
          user_id: uid,
          _set: {
            username: data.username,
            name: data.name,
          },
        });
        router.push("/");
      }
    } catch (error) {
      toast.error(error?.message || "Unexpected error occured");
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="bg-paper rounded-lg p-6 max-w-sm shadow-lg">
        <header className="mb-4 flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
          <Image src="/assets/onboarding.png" alt="" width={300} height={167} />
          <div className="space-y-1 mt-2">
            <h2 className="text-lg">Let&apos;s decide the name</h2>
            <p className="text-gray-400 text-sm">
              A username is the @username other Flare users can use to find you.
              A name is the name visible to users on your profile. You can
              always change these later.
            </p>
          </div>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
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
            Complete
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OnboardinForm;
