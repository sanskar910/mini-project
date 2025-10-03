import React from 'react';
import '../assets/Sidebar.css';

const Sidebar = ({ isOpen, onToggle, activeSection, onSectionChange, userRole, onLogout }) => {
  const menuItems = [
    {
      id: 'faculty',
      label: 'Faculty Data Management',
      icon: '👥'
    },
    {
      id: 'classroom',
      label: 'Classroom Data Management',
      icon: '🏫'
    },
    {
      id: 'subject',
      label: 'Subject Management',
      icon: '📚'
    },
    {
      id: 'timetable',
      label: 'Timetable Management',
      icon: '📅'
    },
    {
      id: 'reports',
      label: 'Reports and Analytics',
      icon: '📊'
    }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">EduAdmin</span>
        </div>
        <button className="close-btn" onClick={onToggle}>×</button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onSectionChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">A</div>
          <div className="user-details">
            <span className="user-name">Admin User</span>
            <span className="user-role">{userRole}</span>
          </div>
        </div>
        <button className="sidebar-logout-btn" onClick={onLogout}>
          <span className="logout-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;