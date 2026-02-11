import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import RoomScanner from "./pages/RoomScanner";
import ColorSimulator from "./pages/ColorSimulator";
import ThemePacks from "./pages/ThemePacks";
import BudgetEstimator from "./pages/BudgetEstimator";
import RoomDesigner from "./pages/RoomDesigner";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<RoomScanner />} />
            <Route path="/colors" element={<ColorSimulator />} />
            <Route path="/themes" element={<ThemePacks />} />
            <Route path="/budget" element={<BudgetEstimator />} />
            <Route path="/designer" element={<RoomDesigner />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
