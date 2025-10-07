import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AuthenticatedRoute } from "@/components/auth/AuthenticatedRoute";
import { ThemeProvider } from "@/hooks/use-theme";
import { AppLayout } from "@/components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import Upload from "./pages/Upload";
import Pipeline from "./pages/Pipeline";
import TBRD from "./pages/TBRD";
import Search from "./pages/Search";
import Conversation from "./pages/Conversation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/cases"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <Cases />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/cases/:caseId"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <CaseDetail />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/cases/:caseId/upload"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <Upload />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/cases/:caseId/pipeline"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <Pipeline />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/cases/:caseId/tbrd"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <TBRD />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <Search />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/conversation"
                element={
                  <AuthenticatedRoute>
                    <AppLayout>
                      <Conversation />
                    </AppLayout>
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
