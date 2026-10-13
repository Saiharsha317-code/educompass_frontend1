import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import PathwaysView from './components/PathwaysView';
import CareersView from './components/CareersView';
import QuizView from './components/QuizView';
import ExamsView from './components/ExamsView';
import ScholarshipsView from './components/ScholarshipsView';
import PreparationView from './components/PreparationView';
import ForumView from './components/ForumView';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import SavedCareersView from './components/SavedCareersView';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { api } from './services/api';

export default function App() {
  const [backendHealthy, setBackendHealthy] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check health on mount
    api.checkHealth()
      .then(() => setBackendHealthy(true))
      .catch(() => setBackendHealthy(false));
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleNavigate = (target) => {
    const routeMap = {
      home: '/',
      pathways: '/pathways',
      careers: '/careers',
      quiz: '/quiz',
      exams: '/exams',
      scholarships: '/scholarships',
      prep: '/preparation',
      preparation: '/preparation',
      forum: '/forum',
      login: '/login',
      register: '/register',
      dashboard: '/dashboard',
      profile: '/profile',
      'saved-careers': '/saved-careers'
    };
    const path = routeMap[target] || (target.startsWith('/') ? target : `/${target}`);
    navigate(path);
  };

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Backend connectivity status badge if offline */}
      {backendHealthy === false && (
        <div style={{ background: '#fef2f2', borderBottom: '1px solid #fecaca', color: '#991b1b', padding: '0.4rem 1rem', fontSize: '0.85rem', textAlign: 'center' }}>
          ⚠️ Notice: Could not connect to Spring Boot API on port 8080. Ensure the backend is running to access real-time databases and the recommendation engine.
        </div>
      )}

      {/* Navigation Header */}
      <Navbar onTabChange={handleNavigate} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomeView onNavigate={handleNavigate} />} />
          <Route path="/pathways" element={<PathwaysView onNavigate={handleNavigate} />} />
          <Route path="/careers" element={<CareersView onNavigate={handleNavigate} />} />
          <Route path="/exams" element={<ExamsView />} />
          <Route path="/quiz" element={<QuizView onNavigate={handleNavigate} />} />
          <Route path="/scholarships" element={<ScholarshipsView />} />
          <Route path="/preparation" element={<PreparationView onNavigate={handleNavigate} />} />
          <Route path="/forum" element={<ForumView />} />
          
          {/* Authentication & Student Profile Hub */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-careers"
            element={
              <ProtectedRoute>
                <SavedCareersView />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

