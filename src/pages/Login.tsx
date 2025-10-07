import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal-config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, UserCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const { instance, accounts } = useMsal();
  const { loginAnonymously, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const handleAnonymousLogin = () => {
    loginAnonymously();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <Brain className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ADDED AI Agent</h1>
          <p className="mt-2 text-muted-foreground">
            Technical BRD Generator Portal
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Sign in with Microsoft
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Sign in with your Microsoft Entra ID credentials
          </p>

          <div className="relative">
            <Separator className="my-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            onClick={handleAnonymousLogin}
            size="lg"
            variant="outline"
            className="w-full"
          >
            <UserCircle className="mr-2 h-5 w-5" />
            Continue as Guest
          </Button>
        </div>
      </Card>
    </div>
  );
}
