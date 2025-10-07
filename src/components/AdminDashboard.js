import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FacultyDataManagement from './admin/FacultyDataManagement';
import ClassroomDataManagement from './admin/ClassroomDataManagement';
import SubjectManagement from './admin/SubjectManagement';
import TimetableManagement from './admin/TimetableManagement';
import ReportsAnalytics from './admin/ReportsAnalytics';
import '../assets/AdminDashboard.css';

const AdminDashboard = ({ userRole, onLogout }) => {
  const [activeSection, setActiveSection] = useState('faculty');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'faculty':
        return <FacultyDataManagement />;
      case 'classroom':
        return <ClassroomDataManagement />;
      case 'subject':
        return <SubjectManagement />;
      case 'timetable':
        return <TimetableManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      default:
        return <FacultyDataManagement />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        userRole={userRole}
        onLogout={onLogout}
      />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="dashboard-header">
          <button className={`hamburger-btn ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, Admin</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </header>
        
        <main className="dashboard-main">
          {renderActiveSection()}
        </main>
      </div>
      
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default AdminDashboard;