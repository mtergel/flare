import Fallback from "@/components/Fallback/Fallback";
import { useAuth } from "context/auth";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import LoginForm from "ui/Auth/LoginForm";
import MinHeader from "ui/Layout/MinHeader";

const Enter: NextPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && !loading) {
      router.replace("/");
    }
    // eslint-disable-next-line
  }, [user, loading]);

  return (
    <>
      <NextSeo title="Login" description="Login to Flare." />
      {loading ? <Fallback /> : !user && <EnterComponent />}
    </>
  );
};

// Login page
const EnterComponent: React.FC<{}> = () => {
  return (
    <div className="w-full h-full flex relative sm:items-center sm:justify-center">
      <div className="block sm:hidden absolute top-0 w-full bg-paper">
        <MinHeader />
      </div>
      <div className="bg-paper flex-grow mt-16 py-8 px-4 sm:h-96 sm:rounded-lg sm:py-6 sm:px-6 sm:flex-grow-0 sm:max-w-lg sm:mx-auto">
        <LoginForm />
      </div>
    </div>
  );
};

export default Enter;
