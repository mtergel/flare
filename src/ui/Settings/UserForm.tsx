import Button from "@/components/Button/Button";
import FormControl from "@/components/FormControl/FormControl";
import Input from "@/components/Input/Input";
import {
  GetUserByUsernameDocument,
  GetUserByUsernameQuery,
  GetUserByUsernameQueryVariables,
  useUpdateUserMutation,
} from "graphql/generated/graphql";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useClient } from "urql";
import { usernameReg } from "utils/regex";

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

export default UserForm;
