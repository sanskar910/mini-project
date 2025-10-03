import React, { useState } from 'react';

const TimetableManagement = () => {
  const [faculty] = useState([
    { id: 1, name: 'Dr. John Smith' },
    { id: 2, name: 'Dr. Sarah Johnson' },
    { id: 3, name: 'Dr. Mike Wilson' },
    { id: 4, name: 'Dr. Emily Davis' }
  ]);

  const [subjects] = useState([
    { id: 1, name: 'Data Structures', code: 'CS101' },
    { id: 2, name: 'Calculus I', code: 'MATH101' },
    { id: 3, name: 'Physics I', code: 'PHY101' },
    { id: 4, name: 'Organic Chemistry', code: 'CHEM201' },
    { id: 5, name: 'Machine Learning', code: 'CS301' }
  ]);

  const [classrooms] = useState([
    { id: 1, roomNumber: 'CS-101' },
    { id: 2, roomNumber: 'MATH-201' },
    { id: 3, roomNumber: 'PHY-301' },
    { id: 4, roomNumber: 'CHEM-401' }
  ]);

  const [timetables, setTimetables] = useState([
    { id: 1, facultyId: 1, subjectId: 1, classroomId: 1, day: 'Monday', startTime: '09:00', endTime: '10:30', semester: 'Fall 2024' },
    { id: 2, facultyId: 2, subjectId: 2, classroomId: 2, day: 'Tuesday', startTime: '11:00', endTime: '12:30', semester: 'Fall 2024' },
    { id: 3, facultyId: 3, subjectId: 3, classroomId: 3, day: 'Wednesday', startTime: '14:00', endTime: '15:30', semester: 'Fall 2024' },
    { id: 4, facultyId: 1, subjectId: 5, classroomId: 1, day: 'Thursday', startTime: '10:00', endTime: '11:30', semester: 'Fall 2024' }
  ]);

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
      id: Date.now(),
      facultyId: parseInt(newTimetable.facultyId),
      subjectId: parseInt(newTimetable.subjectId),
      classroomId: parseInt(newTimetable.classroomId)
    };
    setTimetables([...timetables, timetable]);
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
      id: editingTimetable.id,
      facultyId: parseInt(newTimetable.facultyId),
      subjectId: parseInt(newTimetable.subjectId),
      classroomId: parseInt(newTimetable.classroomId)
    };
    setTimetables(timetables.map(t => t.id === editingTimetable.id ? updatedTimetable : t));
    setNewTimetable({ facultyId: '', subjectId: '', classroomId: '', day: '', startTime: '', endTime: '', semester: '' });
    setEditingTimetable(null);
    setShowAddForm(false);
  };

  const handleDeleteTimetable = (id) => {
    setTimetables(timetables.filter(t => t.id !== id));
  };

  const resetForm = () => {
    setNewTimetable({ facultyId: '', subjectId: '', classroomId: '', day: '', startTime: '', endTime: '', semester: '' });
    setEditingTimetable(null);
    setShowAddForm(false);
  };

  return (
    <div className="timetable-management">
      <div className="section-header">
        <h2>Timetable Management</h2>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>+ Add Schedule</button>
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