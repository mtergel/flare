import Fallback from "@/components/Fallback/Fallback";
import FormControl from "@/components/FormControl/FormControl";
import Input from "@/components/Input/Input";
import { useAuth } from "context/auth";
import { useGetUserQuery } from "graphql/generated/graphql";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";
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
    return <Info uid={user.uid} />;
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
      <UserForm
        uid={uid}
        name={user.name}
        username={user.username!}
        bio={user.bio}
        image={user.image}
      />
    );
  }

  return null;
};

interface UserFormProps {
  uid: string;
  name: string;
  username: string;
  bio?: string | null;
  image?: string | null;
}
const UserForm: React.FC<UserFormProps> = ({
  uid,
  name,
  username,
  bio,
  image,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      uid,
      name,
      username,
      bio,
      image,
    },
  });

  const onSubmit = async (data: UserFormProps) => {
    try {
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl inValid={!!errors.name}>
        <label htmlFor="name">Nickname</label>
        <Input
          id="name"
          autoComplete="off"
          isFullWidth
          {...register("name", {
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
        {errors.name && <span className="error">{errors.name.message}</span>}
      </FormControl>
    </form>
  );
};

Settings.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Settings;
