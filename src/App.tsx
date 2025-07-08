
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Index from "./pages/Index";
import RequestService from "./pages/RequestService";
import RequestConfirmation from "./pages/RequestConfirmation";
import JobDetails from "./pages/JobDetails";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import History from "./pages/History";
import Rewards from "./pages/Rewards";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Subscription from "./pages/Subscription";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/history" element={<History />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/request/:serviceType" element={<RequestService />} />
            <Route path="/request-confirmation" element={<RequestConfirmation />} />
            <Route path="/job/:jobId" element={<JobDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
