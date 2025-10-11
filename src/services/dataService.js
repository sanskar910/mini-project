import { faculty as frontendFaculty } from '../data/userData.js';
import apiService from './apiService.js';

class DataService {
  constructor() {
    this.facultyData = [...frontendFaculty];
    this.subscribers = [];
    this.isOnline = navigator.onLine;
    
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncWithBackend();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.facultyData));
  }

  getFacultyData() {
    return [...this.facultyData];
  }

  updateFacultyData(newData) {
    this.facultyData = [...newData];
    this.notifySubscribers();
  }

  async addFaculty(faculty) {
    try {
      if (this.isOnline) {
        const newFaculty = await apiService.addFaculty(faculty);
        this.facultyData.push(newFaculty);
      } else {
        const newFaculty = { ...faculty, id: Date.now() };
        this.facultyData.push(newFaculty);
      }
      this.notifySubscribers();
    } catch (error) {
      console.error('Failed to add faculty:', error);
      const newFaculty = { ...faculty, id: Date.now() };
      this.facultyData.push(newFaculty);
      this.notifySubscribers();
    }
  }

  async updateFaculty(id, updatedFaculty) {
    try {
      if (this.isOnline) {
        await apiService.updateFaculty(id, updatedFaculty);
      }
      const index = this.facultyData.findIndex(f => f.id === id);
      if (index !== -1) {
        this.facultyData[index] = { ...updatedFaculty, id };
        this.notifySubscribers();
        return this.facultyData[index];
      }
    } catch (error) {
      console.error('Failed to update faculty:', error);
      const index = this.facultyData.findIndex(f => f.id === id);
      if (index !== -1) {
        this.facultyData[index] = { ...updatedFaculty, id };
        this.notifySubscribers();
      }
    }
    return null;
  }

  async deleteFaculty(id) {
    try {
      if (this.isOnline) {
        await apiService.deleteFaculty(id);
      }
      this.facultyData = this.facultyData.filter(f => f.id !== id);
      this.notifySubscribers();
    } catch (error) {
      console.error('Failed to delete faculty:', error);
      this.facultyData = this.facultyData.filter(f => f.id !== id);
      this.notifySubscribers();
    }
  }

  async syncWithBackend() {
    try {
      if (this.isOnline) {
        const backendData = await apiService.getFaculty();
        if (backendData.length > 0) {
          this.facultyData = backendData;
        } else {
          this.facultyData = [...frontendFaculty];
        }
      } else {
        this.facultyData = [...frontendFaculty];
      }
      this.notifySubscribers();
    } catch (error) {
      console.error('Failed to sync with backend:', error);
      this.facultyData = [...frontendFaculty];
      this.notifySubscribers();
    }
  }
}

const dataService = new DataService();
export default dataService;