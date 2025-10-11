import React, { useState, useEffect } from 'react';
import { faculty, classrooms, subjects } from '../data/userData.js';
import { useTimetable } from '../context/TimetableContext';
import '../assets/FacultyDashboard.css';

const FacultyDashboard = ({ userRole, onLogout, facultyId }) => {
  const [facultyData, setFacultyData] = useState(null);
  const [facultyTimetable, setFacultyTimetable] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Get facultyId from props or localStorage
  const currentFacultyId = facultyId || parseInt(localStorage.getItem('facultyId')) || 1;

  useEffect(() => {
    // Get faculty data from localStorage or fetch from API
    const storedFacultyData = localStorage.getItem('facultyData');
    if (storedFacultyData) {
      setFacultyData(JSON.parse(storedFacultyData));
    } else {
      const currentFaculty = faculty.find(f => f.id === currentFacultyId);
      setFacultyData(currentFaculty);
    }
  }, [currentFacultyId]);

  useEffect(() => {
    // Direct timetable data
    const timetables = [
      { id: 1, facultyId: 1, subjectId: 1, classroomId: 1, day: "Monday", startTime: "09:00", endTime: "10:00", semester: "BCA 5th" },
      { id: 2, facultyId: 2, subjectId: 2, classroomId: 2, day: "Tuesday", startTime: "11:00", endTime: "12:00", semester: "BCA 3th" },
      { id: 3, facultyId: 3, subjectId: 3, classroomId: 3, day: "Wednesday", startTime: "14:00", endTime: "15:00", semester: "BCA 5th" },
      { id: 4, facultyId: 1, subjectId: 5, classroomId: 1, day: "Thursday", startTime: "10:00", endTime: "11:00", semester: "BCA 3th" },
      { id: 5, facultyId: 2, subjectId: 6, classroomId: 2, day: "Friday", startTime: "13:00", endTime: "14:00", semester: "IMCA 5th" }
    ];
    
    const facultySchedule = timetables
      .filter(t => t.facultyId === currentFacultyId)
      .map(timetable => {
        const subject = subjects.find(s => s.id === timetable.subjectId);
        const classroom = classrooms.find(c => c.id === timetable.classroomId);
        
        return {
          ...timetable,
          subjectName: subject?.name || 'Unknown Subject',
          subjectCode: subject?.code || 'N/A',
          classroomNumber: classroom?.roomNumber || 'TBA',
          location: classroom?.location || 'TBA'
        };
      })
      .sort((a, b) => {
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        if (dayDiff !== 0) return dayDiff;
        return a.startTime.localeCompare(b.startTime);
      });
    
    setFacultyTimetable(facultySchedule);
    setLastUpdated(new Date());
    setLoading(false);
  }, [currentFacultyId]);

  useEffect(() => {
    const handleTimetableUpdate = (event) => {
      console.log('Timetable updated in real-time:', event.detail.timestamp);
    };

    const handleTimetableExport = (event) => {
      console.log('Timetable exported:', event.detail.message);
      // Show notification to faculty
      const notification = document.createElement('div');
      notification.className = 'export-notification';
      notification.textContent = 'Timetable updated! Your schedule has been refreshed.';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    };

    window.addEventListener('timetableUpdated', handleTimetableUpdate);
    window.addEventListener('timetableExported', handleTimetableExport);
    
    return () => {
      window.removeEventListener('timetableUpdated', handleTimetableUpdate);
      window.removeEventListener('timetableExported', handleTimetableExport);
    };
  }, []);

  const getDaySchedule = (day) => {
    return facultyTimetable.filter(t => t.day === day);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  if (!facultyData || loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="faculty-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="faculty-info">
            <h1>Faculty Dashboard</h1>
            <div className="faculty-details">
              <h2>{facultyData.name}</h2>
              <p className="department">{facultyData.department} Department</p>
              <p className="position">{facultyData.position}</p>
            </div>
          </div>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="faculty-profile-card">
          <h3>Profile Information</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <strong>Email:</strong> {facultyData.email}
            </div>
            <div className="profile-item">
              <strong>Phone:</strong> {facultyData.phone}
            </div>
            <div className="profile-item">
              <strong>Office:</strong> {facultyData.office}
            </div>
            <div className="profile-item">
              <strong>Office Hours:</strong> {facultyData.officeHours}
            </div>
          </div>
          <div className="subjects-taught">
            <strong>Subjects:</strong>
            <div className="subject-tags">
              {facultyData.subjects.map((subject, index) => (
                <span key={index} className="subject-tag">{subject}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="timetable-section">
          <div className="timetable-header">
            <h3>My Weekly Timetable</h3>
            <div className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
          <div className="timetable-grid">
            {weekDays.map(day => (
              <div key={day} className="day-column">
                <div className="day-header">{day}</div>
                <div className="day-schedule">
                  {getDaySchedule(day).length > 0 ? (
                    getDaySchedule(day).map(schedule => (
                      <div key={schedule.id} className="schedule-item">
                        <div className="time-slot">
                          {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                        </div>
                        <div className="subject-info">
                          <div className="subject-name">{schedule.subjectName}</div>
                          <div className="subject-code">{schedule.subjectCode}</div>
                        </div>
                        <div className="classroom-info">
                          <div className="room-number">{schedule.classroomNumber}</div>
                          <div className="location">{schedule.location}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-classes">No classes scheduled</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat-card">
            <h4>Total Classes This Week</h4>
            <div className="stat-number">{facultyTimetable.length}</div>
          </div>
          <div className="stat-card">
            <h4>Subjects Teaching</h4>
            <div className="stat-number">{facultyData.subjects.length}</div>
          </div>
          <div className="stat-card">
            <h4>Current Semester</h4>
            <div className="stat-text">Fall 2024</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;