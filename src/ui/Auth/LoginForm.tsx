import { MdFlare } from "@react-icons/all-files/md/MdFlare";
import { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import toast from "react-hot-toast";
import { auth } from "initApp";
import Button from "@/components/Button/Button";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import { FirebaseError } from "@firebase/util";

const handleError = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/popup-blocked": {
      toast.error("Enable popups on this website");
      break;
    }
    case "auth/popup-blockedauth/account-exists-with-different-credential": {
      toast.error("Email is used in an other provider");
      break;
    }

    case "auth/popup-closed-by-user": {
      toast.error(error.message);
      break;
    }

    default: {
      toast.error(error.message);
    }
  }
};

const LoginForm: React.FC<{}> = () => {
  const [loadingState, setLoadingState] = useState({
    google: false,
    github: false,
    facebook: false,
  });
  const handleGoogle = async () => {
    try {
      setLoadingState({
        ...loadingState,
        google: true,
      });
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleError(error);
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
      handleError(error);
      setLoadingState({
        ...loadingState,
        github: false,
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
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
      <div className="space-y-2 mt-8 flex-grow flex flex-col justify-end">
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
    </div>
  );
};

export default LoginForm;
