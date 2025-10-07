import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { ReactNode } from "react";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

export function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
