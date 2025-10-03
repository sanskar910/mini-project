import React, { useState } from 'react';

const ClassroomDataManagement = () => {
  const [classrooms, setClassrooms] = useState([
    { id: 1, roomNumber: 'CS-101', capacity: 30, location: 'Computer Science Building', equipment: ['Projector', 'Whiteboard', 'AC'] },
    { id: 2, roomNumber: 'MATH-201', capacity: 40, location: 'Mathematics Building', equipment: ['Smart Board', 'AC', 'Sound System'] },
    { id: 3, roomNumber: 'PHY-301', capacity: 25, location: 'Physics Building', equipment: ['Lab Equipment', 'Projector', 'Ventilation'] },
    { id: 4, roomNumber: 'CHEM-401', capacity: 20, location: 'Chemistry Building', equipment: ['Fume Hood', 'Lab Benches', 'Safety Equipment'] }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [newClassroom, setNewClassroom] = useState({ roomNumber: '', capacity: '', location: '', equipment: '' });

  const handleAddClassroom = (e) => {
    e.preventDefault();
    const classroom = { 
      ...newClassroom, 
      id: Date.now(), 
      capacity: parseInt(newClassroom.capacity),
      equipment: newClassroom.equipment.split(',').map(item => item.trim()).filter(item => item)
    };
    setClassrooms([...classrooms, classroom]);
    setNewClassroom({ roomNumber: '', capacity: '', location: '', equipment: '' });
    setShowAddForm(false);
  };

  const handleEditClassroom = (classroom) => {
    setEditingClassroom(classroom);
    setNewClassroom({
      ...classroom,
      equipment: Array.isArray(classroom.equipment) ? classroom.equipment.join(', ') : classroom.equipment
    });
    setShowAddForm(true);
  };

  const handleUpdateClassroom = (e) => {
    e.preventDefault();
    const updatedClassroom = {
      ...newClassroom,
      id: editingClassroom.id,
      capacity: parseInt(newClassroom.capacity),
      equipment: newClassroom.equipment.split(',').map(item => item.trim()).filter(item => item)
    };
    setClassrooms(classrooms.map(c => c.id === editingClassroom.id ? updatedClassroom : c));
    setNewClassroom({ roomNumber: '', capacity: '', location: '', equipment: '' });
    setEditingClassroom(null);
    setShowAddForm(false);
  };

  const handleDeleteClassroom = (id) => {
    setClassrooms(classrooms.filter(c => c.id !== id));
  };

  const resetForm = () => {
    setNewClassroom({ roomNumber: '', capacity: '', location: '', equipment: '' });
    setEditingClassroom(null);
    setShowAddForm(false);
  };

  return (
    <div className="classroom-management">
      <div className="section-header">
        <h2>Classroom Management</h2>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>+ Add Classroom</button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingClassroom ? 'Edit Classroom' : 'Add New Classroom'}</h3>
            <form onSubmit={editingClassroom ? handleUpdateClassroom : handleAddClassroom}>
              <input
                type="text"
                placeholder="Room Number"
                value={newClassroom.roomNumber}
                onChange={(e) => setNewClassroom({...newClassroom, roomNumber: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Capacity"
                value={newClassroom.capacity}
                onChange={(e) => setNewClassroom({...newClassroom, capacity: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={newClassroom.location}
                onChange={(e) => setNewClassroom({...newClassroom, location: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Equipment (comma separated)"
                value={newClassroom.equipment}
                onChange={(e) => setNewClassroom({...newClassroom, equipment: e.target.value})}
              />
              <div className="modal-actions">
                <button type="submit">{editingClassroom ? 'Update' : 'Add'} Classroom</button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="classroom-grid">
        {classrooms.map(classroom => (
          <div key={classroom.id} className="classroom-card">
            <h3>{classroom.roomNumber}</h3>
            <p><strong>Capacity:</strong> {classroom.capacity} students</p>
            <p><strong>Location:</strong> {classroom.location}</p>
            <p><strong>Equipment:</strong></p>
            <div className="equipment-list">
              {Array.isArray(classroom.equipment) ? 
                classroom.equipment.map((item, idx) => (
                  <span key={idx} className="equipment-tag">{item}</span>
                )) : 
                <span>{classroom.equipment}</span>
              }
            </div>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEditClassroom(classroom)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteClassroom(classroom.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomDataManagement;