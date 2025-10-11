import React, { createContext, useContext, useState, useEffect } from 'react';
import { timetables as initialTimetables } from '../data/userData.js';

const TimetableContext = createContext();

export const useTimetable = () => {
  const context = useContext(TimetableContext);
  if (!context) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
};

export const TimetableProvider = ({ children }) => {
  const [timetables, setTimetables] = useState(initialTimetables);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateTimetable = (newTimetables) => {
    setTimetables(newTimetables);
    setLastUpdated(new Date());
    
    window.dispatchEvent(new CustomEvent('timetableUpdated', {
      detail: { timetables: newTimetables, timestamp: new Date() }
    }));
  };

  const addTimetableEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Math.max(...timetables.map(t => t.id)) + 1
    };
    const updatedTimetables = [...timetables, newEntry];
    updateTimetable(updatedTimetables);
  };

  const updateTimetableEntry = (id, updatedEntry) => {
    const updatedTimetables = timetables.map(t => 
      t.id === id ? { ...t, ...updatedEntry } : t
    );
    updateTimetable(updatedTimetables);
  };

  const deleteTimetableEntry = (id) => {
    const updatedTimetables = timetables.filter(t => t.id !== id);
    updateTimetable(updatedTimetables);
  };

  const getFacultyTimetable = (facultyId) => {
    return timetables.filter(t => t.facultyId === facultyId);
  };

  const value = {
    timetables,
    lastUpdated,
    updateTimetable,
    addTimetableEntry,
    updateTimetableEntry,
    deleteTimetableEntry,
    getFacultyTimetable
  };

  return (
    <TimetableContext.Provider value={value}>
      {children}
    </TimetableContext.Provider>
  );
};

export default TimetableContext;