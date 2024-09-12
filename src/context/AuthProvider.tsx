import { createContext, useState } from "react";

interface AuthContextType {
  authed: boolean;
  setAuthed: (auth: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);

  return (
    <AuthContext.Provider value={{ authed, setAuthed }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
