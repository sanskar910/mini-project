import React from 'react';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({ userRole, onLogout }) => {
  if (userRole === 'admin') {
    return <AdminDashboard userRole={userRole} onLogout={onLogout} />;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Welcome to University Management System</h2>
      <p>Role: {userRole}</p>
      <button onClick={onLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>Logout</button>
    </div>
  );
};

export default Dashboard;