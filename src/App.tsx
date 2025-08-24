import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Landing } from './components/Landing';
import { AuthForm } from './components/auth/AuthForm';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';

function AppContent() {
  const [showAuth, setShowAuth] = useState<'signup' | 'signin' | false>(false);
  const { user, loading } = useAuth();

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