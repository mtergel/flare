import Button from "@/components/Button/Button";
import { supabase } from "@/utils/supabaseClient";

import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import { MdFlare } from "@react-icons/all-files/md/MdFlare";
import { useState } from "react";
import toast from "react-hot-toast";

// const handleError = (error: FirebaseError) => {
//   switch (error.code) {
//     case "auth/popup-blocked": {
//       toast.error("Enable popups on this website");
//       break;
//     }
//     case "auth/popup-blockedauth/account-exists-with-different-credential": {
//       toast.error("Email is used in an other provider");
//       break;
//     }

//     case "auth/popup-closed-by-user": {
//       toast.error(error.message);
//       break;
//     }

//     default: {
//       toast.error(error.message);
//       break;
//     }
//   }
// };

const LoginForm: React.FC<{}> = () => {
  const [loadingState, setLoadingState] = useState({
    google: false,
    github: false,
    facebook: false,
  });
  const handleGoogle = async () => {
    setLoadingState({
      ...loadingState,
      google: true,
    });

    // redirect
    await supabase.auth.signIn({
      provider: "google",
    });
  };

  const handleGithub = async () => {
    try {
      setLoadingState({
        ...loadingState,
        github: true,
      });
    } catch (error) {}
  };

  return (
    <div className="pt-8 h-full flex flex-col">
      <header className="text-center flex flex-col items-center justify-center">
        <h1>
          <div className="font-bold flex-grow flex space-x-1 items-center">
            <span>
              <MdFlare className="text-primary-500 h-10 w-10" />
            </span>
            <span className="text-4xl tracking-wider">Flare</span>
          </div>
        </h1>
        <p className="text-secondary pt-4">
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
          variant="outline"
        >
          Continue with Google
        </Button>
        <Button
          isLoading={loadingState.github}
          loadingText="Please wait"
          isFullWidth
          onClick={handleGithub}
          leftIcon={<FaGithub />}
          variant="outline"
        >
          Continue with Github
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
