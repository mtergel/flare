import Button from "@/components/Button/Button";
import { supabase } from "@/utils/supabaseClient";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import Image from "next/image";
import { useState } from "react";

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

      // redirect
      await supabase.auth.signIn({
        provider: "github",
      });
    } catch (error) {}
  };

  return (
    <div className="pt-8 h-full flex flex-col">
      <header className="text-center flex flex-col items-center justify-center">
        <h1>
          <div className="font-bold flex-grow flex space-x-2 items-center">
            <div>
              <Image
                src="/assets/logo_small.png"
                alt=""
                width={48}
                height={48}
                objectFit="contain"
              />
            </div>
            <span className="text-4xl tracking-wider">Flare</span>
          </div>
        </h1>
        <p className="text-secondary pt-4 text-sm text-tMuted">
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
