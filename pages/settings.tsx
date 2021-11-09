import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import { useAuth } from "context/auth";
import { useGetUserQuery } from "graphql/generated/graphql";
import { useRouter } from "next/dist/client/router";
import Layout from "ui/Layout/Layout";
import ErrorMessage from "ui/misc/ErrorMessage";
import ChangeAvatar from "ui/Settings/ChangeAvatar";
import UserForm from "ui/Settings/UserForm";
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

Settings.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Settings;
