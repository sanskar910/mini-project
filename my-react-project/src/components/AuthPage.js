import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AdminDashboard from './AdminDashboard';
import '../assets/LoginPage.css';
import '../assets/responsive-utils.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const toggleToSignup = () => setIsLogin(false);
  const toggleToLogin = () => setIsLogin(true);
  
  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setIsLogin(true);
  };

  if (isAuthenticated && userRole === 'admin') {
    return <AdminDashboard userRole={userRole} onLogout={handleLogout} />;
  }

  return (
    <>
      {isLogin ? (
        <LoginPage onToggleToSignup={toggleToSignup} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <SignupPage onToggleToLogin={toggleToLogin} />
      )}
    </>
  );
};

export default AuthPage;