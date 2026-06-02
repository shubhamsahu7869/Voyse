import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import ItineraryPage from "./pages/ItineraryPage";
const Guard = ({ children }) => useAuth().user ? children : <Navigate to="/login" />;
export default function App() { return <AuthProvider><Routes>
 <Route path="/" element={<LandingPage />} /><Route path="/login" element={<AuthPage />} /><Route path="/register" element={<AuthPage register />} />
 <Route path="/dashboard" element={<Guard><DashboardPage /></Guard>} /><Route path="/upload" element={<Guard><UploadPage /></Guard>} />
 <Route path="/itinerary/:id" element={<Guard><ItineraryPage /></Guard>} /><Route path="/share/:slug" element={<ItineraryPage shared />} />
</Routes></AuthProvider>; }
