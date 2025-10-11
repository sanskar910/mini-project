import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { TimetableProvider } from './context/TimetableContext';
import './App.css';
import './assets/mobile-responsive.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [facultyId, setFacultyId] = useState(null);

  const handleLogin = (role, facultyId = null) => {
    console.log('App: handleLogin called', { role, facultyId });
    setIsLoggedIn(true);
    setUserRole(role);
    setFacultyId(facultyId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setFacultyId(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('facultyId');
    localStorage.removeItem('facultyData');
  };

  return (
    <TimetableProvider>
      <div className="App">
        {isLoggedIn ? (
          <Dashboard userRole={userRole} onLogout={handleLogout} facultyId={facultyId} />
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </div>
    </TimetableProvider>
  );
}

export default App;
