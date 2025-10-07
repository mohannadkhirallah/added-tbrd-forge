import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/lib/msal-config";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

export const msalInstance = new PublicClientApplication(msalConfig);

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loginAnonymously: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loginAnonymously: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { accounts, instance } = useMsal();
  const [anonymousUser, setAnonymousUser] = useState<any>(null);

  useEffect(() => {
    const storedAnonymous = localStorage.getItem("anonymous_user");
    if (storedAnonymous) {
      setAnonymousUser(JSON.parse(storedAnonymous));
    }
  }, []);

  const loginAnonymously = () => {
    const anonymousUserData = {
      username: "Anonymous User",
      name: "Guest",
      isAnonymous: true,
    };
    localStorage.setItem("anonymous_user", JSON.stringify(anonymousUserData));
    setAnonymousUser(anonymousUserData);
  };

  const logout = () => {
    localStorage.removeItem("anonymous_user");
    setAnonymousUser(null);
    if (accounts.length > 0) {
      instance.logoutRedirect();
    }
  };

  const isAuthenticated = accounts.length > 0 || anonymousUser !== null;
  const user = accounts[0] || anonymousUser;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginAnonymously, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </MsalProvider>
  );
}
