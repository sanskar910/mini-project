const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async getFaculty() {
    try {
      const response = await fetch(`${API_BASE_URL}/faculty`);
      if (!response.ok) throw new Error('Failed to fetch faculty data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching faculty:', error);
      return [];
    }
  }

  async addFaculty(faculty) {
    try {
      const response = await fetch(`${API_BASE_URL}/faculty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faculty)
      });
      if (!response.ok) throw new Error('Failed to add faculty');
      return await response.json();
    } catch (error) {
      console.error('Error adding faculty:', error);
      throw error;
    }
  }

  async updateFaculty(id, faculty) {
    try {
      const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faculty)
      });
      if (!response.ok) throw new Error('Failed to update faculty');
      return await response.json();
    } catch (error) {
      console.error('Error updating faculty:', error);
      throw error;
    }
  }

  async deleteFaculty(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete faculty');
      return true;
    } catch (error) {
      console.error('Error deleting faculty:', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;