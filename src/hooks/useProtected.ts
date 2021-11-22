import { useAuth } from "context/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const useProtected = (redirectUrl?: string) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.replace(redirectUrl ?? "/");
    }
    // eslint-disable-next-line
  }, [user, loading]);

  return { user, loading };
};

export default useProtected;
