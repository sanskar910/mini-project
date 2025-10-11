import React from 'react';
import AdminDashboard from './AdminDashboard';
import FacultyDashboard from './FacultyDashboard';

const Dashboard = ({ userRole, onLogout, facultyId }) => {
  if (userRole === 'admin') {
    return <AdminDashboard userRole={userRole} onLogout={onLogout} />;
  }
  
  if (userRole === 'faculty') {
    return <FacultyDashboard userRole={userRole} onLogout={onLogout} facultyId={facultyId} />;
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