import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  authed: boolean;
  setAuthed: (auth: boolean) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [authed, setAuthed] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ authed, setAuthed, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
