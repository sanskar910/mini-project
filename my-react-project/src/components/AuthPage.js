import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AdminDashboard from './AdminDashboard';
import '../assets/LoginPage.css';
import '../assets/responsive-utils.css';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleToSignup = () => setIsLogin(false);
  const toggleToLogin = () => setIsLogin(true);
  
  const handleLoginSuccess = (role, facultyId) => {
    console.log('AuthPage: Login success', { role, facultyId });
    // Pass login success to parent App component
    onLogin(role, facultyId);
  };

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