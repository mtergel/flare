import { User } from "@firebase/auth";
import cookie from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../initApp";

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  error: string | null;
  logout?: () => Promise<void>;
}>({
  user: null,
  logout: undefined,
  loading: true,
  error: null,
});

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    await auth.signOut();
    setUser(null);
    cookie.remove("token");
    setError(null);
  };

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        cookie.remove("token");
        setLoading(false);
        return;
      }

      setUser(user);
      const tokenResult = await user.getIdTokenResult();
      if (tokenResult.claims["https://hasura.io/jwt/claims"]) {
        // token
        const token = await user.getIdToken();
        cookie.set("token", token, {
          expires: 0.24,
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
      } else {
        try {
          // refetch token
          const token = await user.getIdToken(true);
          cookie.set("token", token, {
            expires: 0.24,
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
          });
        } catch (error) {
          setError("Could not refetch tokens");
        }
      }
      setLoading(false);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout: handleLogout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
