import Container from "@/components/Container/Container";
import { useAuth } from "context/auth";
import Layout from "ui/Layout/Layout";
import UserForm from "ui/Settings/UserForm";
import { NextPageWithLayout } from "utils/types";

const Settings: NextPageWithLayout = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="bg-paper h-full border-t">
        <Container size="small" className="py-12">
          <h1 className="text-4xl font-bold">Settings</h1>
          <div className="mt-12">
            <UserForm user={user} />
          </div>
        </Container>
      </div>
    );
  } else {
    return null;
  }
};

Settings.getLayout = function getLayout(page) {
  return <Layout hideFooter>{page}</Layout>;
};

export default Settings;
