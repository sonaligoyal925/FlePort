import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { FleetLayout } from "./components/fleet/FleetLayout";
import { Dashboard } from "./components/fleet/dashboard/Dashboard";
import { DriversPage } from "./pages/fleet/DriversPage";
import { VehiclesPage } from "./pages/fleet/VehiclesPage";
import { ReportsPage } from "./pages/fleet/ReportsPage";
import { TripsPage } from "./pages/fleet/TripsPage";
import { PayoutsPage } from "./pages/fleet/PayoutsPage";
import { AlertsPage } from "./pages/fleet/AlertsPage";
import { SettingsPage } from "./pages/fleet/SettingsPage";
import { AuthPage } from "./pages/AuthPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/welcome" element={<Index />} />
            <Route path="/" element={
              <ProtectedRoute>
                <FleetLayout><Dashboard /></FleetLayout>
              </ProtectedRoute>
            } />
            <Route path="/drivers" element={
              <ProtectedRoute>
                <FleetLayout><DriversPage /></FleetLayout>
              </ProtectedRoute>
            } />
            <Route path="/vehicles" element={
              <ProtectedRoute>
                <FleetLayout><VehiclesPage /></FleetLayout>
              </ProtectedRoute>
            } />
            <Route path="/trips" element={
              <ProtectedRoute>
                <FleetLayout><TripsPage /></FleetLayout>
              </ProtectedRoute>
            } />
            <Route path="/payouts" element={
              <ProtectedRoute>
                <FleetLayout><PayoutsPage /></FleetLayout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <FleetLayout><ReportsPage /></FleetLayout>
              </ProtectedRoute>
            } />
            <Route path="/alerts" element={
              <ProtectedRoute>
                <FleetLayout><AlertsPage /></FleetLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <FleetLayout><SettingsPage /></FleetLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
