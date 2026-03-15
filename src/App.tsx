import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Speakers from "./pages/Speakers";
import Mentors from "./pages/Mentors";
import Catering from "./pages/Catering";
import Communities from "./pages/Communities";
import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<AppLayout><Index /></AppLayout>} />
            <Route path="/speakers" element={<ProtectedRoute><AppLayout><Speakers /></AppLayout></ProtectedRoute>} />
            <Route path="/mentors" element={<ProtectedRoute><AppLayout><Mentors /></AppLayout></ProtectedRoute>} />
            <Route path="/catering" element={<ProtectedRoute><AppLayout><Catering /></AppLayout></ProtectedRoute>} />
            <Route path="/communities" element={<ProtectedRoute><AppLayout><Communities /></AppLayout></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><AppLayout><AIAssistant /></AppLayout></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
