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
      displayName,
      handle,
    },
  });

  //   URQL client
  const client = useClient();
  const [result, updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: { displayName: string; handle: string }) => {
    try {
      // check for handles

      const res = await client
        .query<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(
          GetUserByUsernameDocument,
          {
            _eq: data.handle,
          }
        )
        .toPromise();

      if (res.data?.users && res.data.users.length > 0) {
        // user exists
        setError("handle", {
          type: "value",
          message: "This username is already taken",
        });
      } else {
        await updateUser({
          user_id: uid,
          username: data.handle,
          name: data.displayName,
        });
      }

      router.push("/");
    } catch (error) {
      // TODO add toast
      console.warn(error);
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
              A nickname is the name visible to users on your profile. You can
              always change these later.
            </p>
          </div>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl inValid={!!errors.displayName}>
            <label htmlFor="username">Nickname</label>
            <Input
              id="username"
              isFullWidth
              {...register("displayName", {
                disabled: isSubmitting,
                required: {
                  message: "A nickname is required",
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
          <FormControl inValid={!!errors.handle}>
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              isFullWidth
              {...register("handle", {
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

            {errors.handle ? (
              <span className="error">{errors.handle.message}</span>
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
