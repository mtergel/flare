import Fallback from "@/components/Fallback/Fallback";
import { useAuth } from "context/auth";
import { useGetUserQuery } from "graphql/generated/graphql";
import { nanoid } from "nanoid";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import ErrorMessage from "ui/misc/ErrorMessage";
import OnboardinForm from "ui/Onboarding/OnboardingForm";
import { usernameReg } from "utils/regex";
import { NextPageWithLayout } from "utils/types";

const Onboarding: NextPageWithLayout = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
    // eslint-disable-next-line
  }, [user, loading]);
  if (user) {
    return <OnboardinContainer />;
  } else {
    return <Fallback />;
  }
};

const OnboardinContainer: React.FC<{}> = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [{ data, fetching, error }] = useGetUserQuery({
    variables: {
      user_id: user!.uid,
    },
  });

  if (fetching) {
    return <Fallback />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  if (data && data.users_by_pk && user) {
    if (data.users_by_pk.username) {
      router.replace("/");
    }
    let _handle = nanoid(15);

    if (user.displayName) {
      let _name = user.displayName.replace(/\s/g, "");
      if (usernameReg.test(_name)) {
        _handle = _name;
      }
    }

    return (
      <OnboardinForm
        uid={user.uid}
        displayName={user?.displayName!}
        handle={_handle}
      />
    );
  }

  return null;
};

export default Onboarding;
