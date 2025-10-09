import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Landing } from './components/Landing';
import { AuthForm } from './components/auth/AuthForm';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { CookiePolicy } from './pages/legal/CookiePolicy';
import { RefundPolicy } from './pages/legal/RefundPolicy';
import { AcceptableUsePolicy } from './pages/legal/AcceptableUsePolicy';

type LegalPage = 'privacy' | 'terms' | 'cookies' | 'refund' | 'acceptable-use' | null;

function AppContent() {
  const [showAuth, setShowAuth] = useState<'signup' | 'signin' | false>(false);
  const [currentLegalPage, setCurrentLegalPage] = useState<LegalPage>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/privacy')) {
      setCurrentLegalPage('privacy');
    } else if (path.startsWith('/terms')) {
      setCurrentLegalPage('terms');
    } else if (path.startsWith('/cookies')) {
      setCurrentLegalPage('cookies');
    } else if (path.startsWith('/refund')) {
      setCurrentLegalPage('refund');
    } else if (path.startsWith('/acceptable-use')) {
      setCurrentLegalPage('acceptable-use');
    }
  }, []);

  const handleBackFromLegal = () => {
    setCurrentLegalPage(null);
    window.history.pushState({}, '', '/');
  };

  if (currentLegalPage === 'privacy') {
    return <PrivacyPolicy onBack={handleBackFromLegal} />;
  }

  if (currentLegalPage === 'terms') {
    return <TermsOfService onBack={handleBackFromLegal} />;
  }

  if (currentLegalPage === 'cookies') {
    return <CookiePolicy onBack={handleBackFromLegal} />;
  }

  if (currentLegalPage === 'refund') {
    return <RefundPolicy onBack={handleBackFromLegal} />;
  }

  if (currentLegalPage === 'acceptable-use') {
    return <AcceptableUsePolicy onBack={handleBackFromLegal} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Dashboard />;
  }

  if (showAuth) {
    return <AuthForm onBack={() => setShowAuth(false)} initialMode={showAuth} />;
  }

  return <Landing onGetStarted={() => setShowAuth('signup')} onSignIn={() => setShowAuth('signin')} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;