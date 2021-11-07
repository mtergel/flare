import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import { MdFlare } from "@react-icons/all-files/md/MdFlare";
import { useAuth } from "context/auth";
import { useGetUserQuery } from "graphql/generated/graphql";
import useDisclosure from "hooks/useDisclosure";
import { auth } from "initApp";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useState } from "react";
import { useClient } from "urql";

const UserButton: React.FC<{}> = () => {
  const { user, loading, error } = useAuth();
  if (loading || error) {
    return null;
  }
  if (user) {
    return <UserDD />;
  } else {
    return <UserLogin />;
  }
};

const UserLogin: React.FC<{}> = () => {
  const [loadingState, setLoadingState] = useState({
    google: false,
    github: false,
    facebook: false,
  });
  const { isOpen, setIsOpen, onOpen } = useDisclosure();
  const handleGoogle = async () => {
    try {
      setLoadingState({
        ...loadingState,
        google: true,
      });
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      // todo
      console.log(error);

      setLoadingState({
        ...loadingState,
        google: false,
      });
    }
  };

  const handleGithub = async () => {
    try {
      setLoadingState({
        ...loadingState,
        github: true,
      });
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      // todo
      console.log(error);
      setLoadingState({
        ...loadingState,
        github: false,
      });
    }
  };

  return (
    <Dialog
      title="Flare"
      description="Where programmers share ideas and help each other grow."
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <>
          <header>
            <h1>
              <div className="text-lg font-bold flex-grow flex space-x-1 items-center">
                <span>
                  <MdFlare className="text-primary-500" />
                </span>
                <span className="text-2xl tracking-wider">Flare</span>
              </div>
            </h1>
            <p className="text-secondary text-sm pt-4">
              Where programmers share ideas and help each other grow.
            </p>
          </header>
          <div className="space-y-2 mt-8">
            <Button
              isLoading={loadingState.google}
              loadingText="Please wait"
              isFullWidth
              onClick={handleGoogle}
              leftIcon={<FaGoogle />}
            >
              Continue with Google
            </Button>
            <Button
              isLoading={loadingState.github}
              loadingText="Please wait"
              isFullWidth
              onClick={handleGithub}
              leftIcon={<FaGithub />}
            >
              Continue with Github
            </Button>
          </div>
        </>
      }
    >
      <Button size="sm" color="primary" onClick={onOpen}>
        Log in
      </Button>
    </Dialog>
  );
};

/**
 * User DropDown component
 */
const UserDD: React.FC<{}> = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [{ data, error }] = useGetUserQuery({
    variables: {
      user_id: user!.uid,
    },
  });

  if (error) {
    if (
      error.graphQLErrors.some(
        (e: any) => e.extensions?.code === "jwt-invalid-claims"
      )
    ) {
      // after creating user the correct token leads to claims not found
      // on gcp function 1-2 seconds
      // redirect anyway and let the onboarding page handle it
      router.replace("/onboarding");
    }
  }

  if (data && data.users_by_pk) {
    // redirect to onboarding
    if (data.users_by_pk.username === null) {
      router.replace("/onboarding");
    }
    return (
      <div onClick={logout}>
        {data.users_by_pk.image && (
          <Image
            unoptimized
            alt=""
            width={40}
            height={40}
            src={data.users_by_pk.image!}
            className="rounded-full"
          />
        )}
      </div>
    );
  }

  return null;
};

export default UserButton;
