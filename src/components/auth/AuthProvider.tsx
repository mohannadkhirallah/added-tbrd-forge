import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/lib/msal-config";
import { createContext, useContext, ReactNode } from "react";

export const msalInstance = new PublicClientApplication(msalConfig);

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const user = accounts[0] || null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
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
