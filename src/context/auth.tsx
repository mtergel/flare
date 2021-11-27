import { definitions } from "@/utils/generated";
import logger from "@/utils/logger";
import { supabase } from "@/utils/supabaseClient";
import { ErrorCode } from "@/utils/types";
import { Session } from "@supabase/gotrue-js";
import useLocalStorage from "hooks/useLocalForage";
import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  user: definitions["profiles"] | null;
  loading: boolean;
  error: ErrorCode | null;
  logout?: () => Promise<void>;
  setUser?: (value: definitions["profiles"]) => void;
}>({
  user: null,
  logout: undefined,
  loading: true,
  error: null,
});

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser, removeUser] = useLocalStorage<
    definitions["profiles"] | null
  >("currentUser", null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorCode | null>(null);
  const router = useRouter();

  // session init
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // user set
  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const currentUser = supabase.auth.user();
        if (currentUser) {
          const { data, error, status } = await supabase
            .from<definitions["profiles"]>("profiles")
            .select(`id, username, avatar_url, display_name, bio`)
            .eq("id", currentUser.id)
            .single();

          if (error && status !== 406) {
            throw error;
          }

          if (data) {
            logger.debug("Settings user: ", data);
            setError(null);
            setUser(data);
          }
        }
      } catch (error) {
        logger.debug(error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      getProfile();
    } else {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, [session]);

  useEffect(() => {
    if (user && user.username === null) {
      setError("NoUsername");
      console.log(router);
      if (router.route !== "/onboarding") {
        router.push("/onboarding");
      }
    }

    // eslint-disable-next-line
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    // remove preview tokens
    fetch("/api/clearPreviewData");
    await supabase.auth.signOut();
    removeUser();
    setError(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, logout: handleLogout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
