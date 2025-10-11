import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import './App.css';
import './assets/mobile-responsive.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [facultyId, setFacultyId] = useState(null);

  const handleLogin = (role, facultyId = null) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setFacultyId(facultyId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setFacultyId(null);
    localStorage.clear();
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard userRole={userRole} onLogout={handleLogout} facultyId={facultyId} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
