import React, { useState } from 'react';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Data Structures', code: 'CS101', description: 'Introduction to data structures and algorithms', credits: 3, department: 'Computer Science' },
    { id: 2, name: 'Calculus I', code: 'MATH101', description: 'Differential and integral calculus', credits: 4, department: 'Mathematics' },
    { id: 3, name: 'Physics I', code: 'PHY101', description: 'Mechanics and thermodynamics', credits: 3, department: 'Physics' },
    { id: 4, name: 'Organic Chemistry', code: 'CHEM201', description: 'Structure and reactions of organic compounds', credits: 4, department: 'Chemistry' },
    { id: 5, name: 'Machine Learning', code: 'CS301', description: 'Introduction to ML algorithms and applications', credits: 3, department: 'Computer Science' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [newSubject, setNewSubject] = useState({ name: '', code: '', description: '', credits: '', department: '' });

  const handleAddSubject = (e) => {
    e.preventDefault();
    const subject = { ...newSubject, id: Date.now(), credits: parseInt(newSubject.credits) };
    setSubjects([...subjects, subject]);
    setNewSubject({ name: '', code: '', description: '', credits: '', department: '' });
    setShowAddForm(false);
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setNewSubject(subject);
    setShowAddForm(true);
  };

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    const updatedSubject = { ...newSubject, id: editingSubject.id, credits: parseInt(newSubject.credits) };
    setSubjects(subjects.map(s => s.id === editingSubject.id ? updatedSubject : s));
    setNewSubject({ name: '', code: '', description: '', credits: '', department: '' });
    setEditingSubject(null);
    setShowAddForm(false);
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const resetForm = () => {
    setNewSubject({ name: '', code: '', description: '', credits: '', department: '' });
    setEditingSubject(null);
    setShowAddForm(false);
  };

  return (
    <div className="subject-management">
      <div className="section-header">
        <h2>Subject Management</h2>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>+ Add Subject</button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</h3>
            <form onSubmit={editingSubject ? handleUpdateSubject : handleAddSubject}>
              <input
                type="text"
                placeholder="Subject Name"
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Subject Code"
                value={newSubject.code}
                onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
                required
              />
              <textarea
                placeholder="Description"
                value={newSubject.description}
                onChange={(e) => setNewSubject({...newSubject, description: e.target.value})}
                rows="3"
              />
              <input
                type="number"
                placeholder="Credits"
                value={newSubject.credits}
                onChange={(e) => setNewSubject({...newSubject, credits: e.target.value})}
                required
              />
              <select
                value={newSubject.department}
                onChange={(e) => setNewSubject({...newSubject, department: e.target.value})}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
              <div className="modal-actions">
                <button type="submit">{editingSubject ? 'Update' : 'Add'} Subject</button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="subject-table">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Credits</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(subject => (
              <tr key={subject.id}>
                <td><strong>{subject.code}</strong></td>
                <td>{subject.name}</td>
                <td>{subject.department}</td>
                <td>{subject.credits}</td>
                <td>{subject.description}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditSubject(subject)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteSubject(subject.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectManagement;