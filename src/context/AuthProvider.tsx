import { createContext, ReactNode, useEffect, useState } from "react";
import { axiosMain } from "../api/axiosProvider";

interface AuthContextType {
  authed: boolean;
  setAuthed: (auth: boolean) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [authed, setAuthed] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await axiosMain.get("/auth/refresh", {
          withCredentials: true,
        });
        const accessToken = response.data.accessToken;
        setAccessToken(accessToken);
        setAuthed(true);
      } catch (err) {
        console.log(
          "ERROR: authProvider: failed to refresh token: " +
            (err as Error).message,
        );
        setAccessToken(null);
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authed,
        setAuthed,
        accessToken,
        setAccessToken,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
