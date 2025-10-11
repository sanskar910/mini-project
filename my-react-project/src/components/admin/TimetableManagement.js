import React, { useState } from 'react';
import { useTimetable } from '../../context/TimetableContext';
import { faculty, subjects, classrooms } from '../../data/userData.js';

const TimetableManagement = () => {
  const { timetables, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry } = useTimetable();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState(null);
  const [newTimetable, setNewTimetable] = useState({
    facultyId: '', subjectId: '', classroomId: '', day: '', startTime: '', endTime: '', semester: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getFacultyName = (id) => faculty.find(f => f.id === parseInt(id))?.name || 'Unknown';
  const getSubjectName = (id) => subjects.find(s => s.id === parseInt(id))?.name || 'Unknown';
  const getClassroomName = (id) => classrooms.find(c => c.id === parseInt(id))?.roomNumber || 'Unknown';

  const handleAddTimetable = (e) => {
    e.preventDefault();
    const timetable = {
      ...newTimetable,
      facultyId: parseInt(newTimetable.facultyId),
      subjectId: parseInt(newTimetable.subjectId),
      classroomId: parseInt(newTimetable.classroomId)
    };
    addTimetableEntry(timetable);
    setNewTimetable({ facultyId: '', subjectId: '', classroomId: '', day: '', startTime: '', endTime: '', semester: '' });
    setShowAddForm(false);
  };

  const handleEditTimetable = (timetable) => {
    setEditingTimetable(timetable);
    setNewTimetable(timetable);
    setShowAddForm(true);
  };

  const handleUpdateTimetable = (e) => {
    e.preventDefault();
    const updatedTimetable = {
      ...newTimetable,
      facultyId: parseInt(newTimetable.facultyId),
      subjectId: parseInt(newTimetable.subjectId),
      classroomId: parseInt(newTimetable.classroomId)
    };
    updateTimetableEntry(editingTimetable.id, updatedTimetable);
    setNewTimetable({ facultyId: '', subjectId: '', classroomId: '', day: '', startTime: '', endTime: '', semester: '' });
    setEditingTimetable(null);
    setShowAddForm(false);
  };

  const handleDeleteTimetable = (id) => {
    deleteTimetableEntry(id);
  };

  const resetForm = () => {
    setNewTimetable({ facultyId: '', subjectId: '', classroomId: '', day: '', startTime: '', endTime: '', semester: '' });
    setEditingTimetable(null);
    setShowAddForm(false);
  };

  const handleExportTimetable = () => {
    // Simulate export and real-time update
    const exportData = {
      timestamp: new Date().toISOString(),
      timetables: timetables,
      totalEntries: timetables.length
    };
    
    // Create and download JSON file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `timetable-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    // Trigger real-time update notification
    window.dispatchEvent(new CustomEvent('timetableExported', {
      detail: { message: 'Timetable exported successfully!', timestamp: new Date() }
    }));
    
    alert('Timetable exported successfully! Faculty dashboards will be updated in real-time.');
  };

  return (
    <div className="timetable-management">
      <div className="section-header">
        <h2>Timetable Management</h2>
        <div className="header-actions">
          <button className="export-btn" onClick={handleExportTimetable}>📤 Export Timetable</button>
          <button className="add-btn" onClick={() => setShowAddForm(true)}>+ Add Schedule</button>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingTimetable ? 'Edit Schedule' : 'Add New Schedule'}</h3>
            <form onSubmit={editingTimetable ? handleUpdateTimetable : handleAddTimetable}>
              <select
                value={newTimetable.facultyId}
                onChange={(e) => setNewTimetable({...newTimetable, facultyId: e.target.value})}
                required
              >
                <option value="">Select Faculty</option>
                {faculty.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              
              <select
                value={newTimetable.subjectId}
                onChange={(e) => setNewTimetable({...newTimetable, subjectId: e.target.value})}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                ))}
              </select>
              
              <select
                value={newTimetable.classroomId}
                onChange={(e) => setNewTimetable({...newTimetable, classroomId: e.target.value})}
                required
              >
                <option value="">Select Classroom</option>
                {classrooms.map(c => (
                  <option key={c.id} value={c.id}>{c.roomNumber}</option>
                ))}
              </select>
              
              <select
                value={newTimetable.day}
                onChange={(e) => setNewTimetable({...newTimetable, day: e.target.value})}
                required
              >
                <option value="">Select Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              
              <input
                type="time"
                placeholder="Start Time"
                value={newTimetable.startTime}
                onChange={(e) => setNewTimetable({...newTimetable, startTime: e.target.value})}
                required
              />
              
              <input
                type="time"
                placeholder="End Time"
                value={newTimetable.endTime}
                onChange={(e) => setNewTimetable({...newTimetable, endTime: e.target.value})}
                required
              />
              
              <input
                type="text"
                placeholder="Semester (e.g., Fall 2024)"
                value={newTimetable.semester}
                onChange={(e) => setNewTimetable({...newTimetable, semester: e.target.value})}
                required
              />
              
              <div className="modal-actions">
                <button type="submit">{editingTimetable ? 'Update' : 'Add'} Schedule</button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="timetable-view">
        <h3>Current Schedules</h3>
        <div className="timetable-table">
          <table>
            <thead>
              <tr>
                <th>Faculty</th>
                <th>Subject</th>
                <th>Classroom</th>
                <th>Day</th>
                <th>Time</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timetables.map(timetable => (
                <tr key={timetable.id}>
                  <td>{getFacultyName(timetable.facultyId)}</td>
                  <td>{getSubjectName(timetable.subjectId)}</td>
                  <td>{getClassroomName(timetable.classroomId)}</td>
                  <td>{timetable.day}</td>
                  <td>{timetable.startTime} - {timetable.endTime}</td>
                  <td>{timetable.semester}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditTimetable(timetable)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteTimetable(timetable.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableManagement;