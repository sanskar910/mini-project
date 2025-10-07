import React from 'react';

const ReportsAnalytics = () => {
  const stats = [
    { title: 'Total Faculty', value: '45', icon: '👥' },
    { title: 'Total Classrooms', value: '25', icon: '🏫' },
    { title: 'Total Subjects', value: '120', icon: '📚' },
    { title: 'Active Timetables', value: '15', icon: '📅' }
  ];

  return (
    <div className="reports-analytics">
      <div className="section-header">
        <h2>Reports and Analytics</h2>
        <button className="export-btn">Export Report</button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-placeholder">
          <h3>Faculty Distribution by Department</h3>
          <div className="chart-mock">📊 Chart will be displayed here</div>
        </div>
        
        <div className="chart-placeholder">
          <h3>Classroom Utilization</h3>
          <div className="chart-mock">📈 Chart will be displayed here</div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;