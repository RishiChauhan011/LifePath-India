import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import ScenarioBuilderPage from './pages/ScenarioBuilderPage';
import SimulationPage from './pages/SimulationPage';
import ResultsPage from './pages/ResultsPage';
import AssetsPage from './pages/AssetsPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import VoiceAssistant from './components/common/VoiceAssistant';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-app-bg font-sans text-white">
          <VoiceAssistant />
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/profile-setup" element={
                <ProtectedRoute>
                  <ProfileSetupPage />
                </ProtectedRoute>
              } />
              <Route path="/scenarios" element={
                <ProtectedRoute>
                  <ScenarioBuilderPage />
                </ProtectedRoute>
              } />
               <Route path="/assets" element={
                <ProtectedRoute>
                  <AssetsPage />
                </ProtectedRoute>
              } />
              {/* Mapping 'Processing' to Simulation Page as per nav link */}
              <Route path="/processing" element={
                <ProtectedRoute>
                  <SimulationPage />
                </ProtectedRoute>
              } />
               <Route path="/simulation" element={
                <ProtectedRoute>
                  <SimulationPage />
                </ProtectedRoute>
              } />
              <Route path="/results/:id" element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } />

              {/* Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
