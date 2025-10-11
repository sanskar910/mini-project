import React, { useState, useEffect } from 'react';
import dataService from '../../services/dataService';
import '../../assets/mobile-responsive.css';
import '../../assets/FacultyDataManagement.css';

const FacultyDataManagement = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  useEffect(() => {
    setFacultyList(dataService.getFacultyData());
    
    const unsubscribe = dataService.subscribe((updatedData) => {
      setFacultyList(updatedData);
      setLastSyncTime(new Date());
    });

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    dataService.syncWithBackend();

    const syncInterval = setInterval(() => {
      dataService.syncWithBackend();
    }, 30000); // Sync every 30 seconds

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(syncInterval);
    };
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [newFaculty, setNewFaculty] = useState({ name: '', department: '', email: '', phone: '', position: '', subjects: '', profile: '', office: '', officeHours: '' });

  const handleAddFaculty = (e) => {
    e.preventDefault();
    const faculty = { 
      ...newFaculty, 
      subjects: newFaculty.subjects.split(',').map(s => s.trim()).filter(s => s)
    };
    dataService.addFaculty(faculty);
    setNewFaculty({ name: '', department: '', email: '', phone: '', position: '', subjects: '', profile: '', office: '', officeHours: '' });
    setShowAddForm(false);
  };

  const handleEditFaculty = (faculty) => {
    setEditingFaculty(faculty);
    setNewFaculty({
      ...faculty,
      subjects: Array.isArray(faculty.subjects) ? faculty.subjects.join(', ') : faculty.subjects
    });
    setShowAddForm(true);
  };

  const handleUpdateFaculty = (e) => {
    e.preventDefault();
    const updatedFaculty = {
      ...newFaculty,
      subjects: newFaculty.subjects.split(',').map(s => s.trim()).filter(s => s)
    };
    dataService.updateFaculty(editingFaculty.id, updatedFaculty);
    setNewFaculty({ name: '', department: '', email: '', phone: '', position: '', subjects: '', profile: '', office: '', officeHours: '' });
    setEditingFaculty(null);
    setShowAddForm(false);
  };

  const resetForm = () => {
    setNewFaculty({ name: '', department: '', email: '', phone: '', position: '', subjects: '', profile: '', office: '', officeHours: '' });
    setEditingFaculty(null);
    setShowAddForm(false);
  };

  const handleDeleteFaculty = (id) => {
    dataService.deleteFaculty(id);
  };

  return (
    <div className="faculty-management">
      <div className="section-header">
        <h2>Faculty Data Management</h2>
        <div className="sync-status">
          <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </span>
          <span className="last-sync">Last sync: {lastSyncTime.toLocaleTimeString()}</span>
        </div>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>+ Add Faculty</button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}</h3>
            <form onSubmit={editingFaculty ? handleUpdateFaculty : handleAddFaculty}>
              <input
                type="text"
                placeholder="Full Name"
                value={newFaculty.name}
                onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Department"
                value={newFaculty.department}
                onChange={(e) => setNewFaculty({...newFaculty, department: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newFaculty.email}
                onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newFaculty.phone}
                onChange={(e) => setNewFaculty({...newFaculty, phone: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Position"
                value={newFaculty.position}
                onChange={(e) => setNewFaculty({...newFaculty, position: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Subjects (comma separated)"
                value={newFaculty.subjects}
                onChange={(e) => setNewFaculty({...newFaculty, subjects: e.target.value})}
              />
              <textarea
                placeholder="Profile/Bio"
                value={newFaculty.profile}
                onChange={(e) => setNewFaculty({...newFaculty, profile: e.target.value})}
                rows="3"
              />
              <input
                type="text"
                placeholder="Office"
                value={newFaculty.office}
                onChange={(e) => setNewFaculty({...newFaculty, office: e.target.value})}
              />
              <input
                type="text"
                placeholder="Office Hours"
                value={newFaculty.officeHours}
                onChange={(e) => setNewFaculty({...newFaculty, officeHours: e.target.value})}
              />
              <div className="modal-actions">
                <button type="submit">{editingFaculty ? 'Update' : 'Add'} Faculty</button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Table Layout */}
      <div className="faculty-table desktop-table-layout">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Subjects</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map(faculty => (
              <tr key={faculty.id}>
                <td>
                  <div className="faculty-name">{faculty.name}</div>
                  <div className="faculty-office">{faculty.office} • {faculty.officeHours}</div>
                </td>
                <td>{faculty.position}</td>
                <td>{faculty.department}</td>
                <td>
                  <div className="subjects-list">
                    {faculty.subjects?.map((subject, idx) => (
                      <span key={idx} className="subject-tag">{subject}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div>{faculty.email}</div>
                  <div>{faculty.phone}</div>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditFaculty(faculty)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteFaculty(faculty.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="mobile-card-layout">
        {facultyList.map(faculty => (
          <div key={faculty.id} className="faculty-mobile-card">
            <div className="faculty-mobile-header">
              <div>
                <div className="faculty-mobile-name">{faculty.name}</div>
                <div className="faculty-mobile-position">{faculty.position}</div>
              </div>
              <div className="faculty-mobile-actions">
                <button className="edit-btn touch-friendly" onClick={() => handleEditFaculty(faculty)}>Edit</button>
                <button className="delete-btn touch-friendly" onClick={() => handleDeleteFaculty(faculty.id)}>Delete</button>
              </div>
            </div>
            
            <div className="faculty-mobile-info">
              <div className="faculty-mobile-row">
                <span className="faculty-mobile-label">Department:</span>
                <span className="faculty-mobile-value">{faculty.department}</span>
              </div>
              
              <div className="faculty-mobile-row">
                <span className="faculty-mobile-label">Email:</span>
                <span className="faculty-mobile-value">{faculty.email}</span>
              </div>
              
              <div className="faculty-mobile-row">
                <span className="faculty-mobile-label">Phone:</span>
                <span className="faculty-mobile-value">{faculty.phone}</span>
              </div>
              
              <div className="faculty-mobile-row">
                <span className="faculty-mobile-label">Office:</span>
                <span className="faculty-mobile-value">{faculty.office}</span>
              </div>
              
              <div className="faculty-mobile-row">
                <span className="faculty-mobile-label">Hours:</span>
                <span className="faculty-mobile-value">{faculty.officeHours}</span>
              </div>
              
              <div className="faculty-mobile-row">
                <span className="faculty-mobile-label">Subjects:</span>
                <div className="faculty-mobile-subjects">
                  {faculty.subjects?.map((subject, idx) => (
                    <span key={idx} className="subject-tag">{subject}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDataManagement;