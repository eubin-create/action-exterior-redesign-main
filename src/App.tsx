import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PortfolioPage from "./pages/PortfolioPage";
import ServicePage from "./pages/ServicePage";
import CommercialServicePage from "./pages/CommercialServicePage";
import LocationPage from "./pages/LocationPage";
import NotFound from "./pages/NotFound";
import SolarClawDashboard from "./pages/solarclaw/SolarClawDashboard";
import SolarClawActivity from "./pages/solarclaw/SolarClawActivity";
import SolarClawProspects from "./pages/solarclaw/SolarClawProspects";
import SolarClawProposals from "./pages/solarclaw/SolarClawProposals";
import SolarClawBuilding from "./pages/solarclaw/SolarClawBuilding";
import { SolarClawProvider } from "./context/SolarClawContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <SolarClawProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/services/:serviceSlug" element={<ServicePage />} />
          <Route path="/commercial/:serviceSlug" element={<CommercialServicePage />} />
          <Route path="/locations/:city" element={<LocationPage />} />
          {/* SolarClaw Platform */}
          <Route path="/solarclaw" element={<SolarClawDashboard />} />
          <Route path="/solarclaw/activity" element={<SolarClawActivity />} />
          <Route path="/solarclaw/prospects" element={<SolarClawProspects />} />
          <Route path="/solarclaw/proposals" element={<SolarClawProposals />} />
          <Route path="/solarclaw/building/:id" element={<SolarClawBuilding />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </SolarClawProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
