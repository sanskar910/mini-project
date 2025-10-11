import React, { useState } from 'react';
import '../assets/LoginPage.css';

const LoginPage = ({ onToggleToSignup, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { ...formData, role: selectedRole });
    
    // Faculty credentials
    const facultyCredentials = {
      'rinkusingh@university.edu': { password: 'rinku123', id: 1 },
      'rohan1294@university.edu': { password: 'rohan123', id: 2 },
      'Aniketpaul@university.edu': { password: 'aniket123', id: 3 },
      'sonali637@university.edu': { password: 'sonali123', id: 4 },
      'sumitsoni@university.edu': { password: 'sumit123', id: 5 },
      'manish236@university.edu': { password: 'manish123', id: 6 }
    };
    
    // Admin credentials
    const adminCredentials = {
      'admin@university.edu': { password: 'admin123', id: 'admin' }
    };
    
    if (selectedRole === 'faculty') {
      const facultyAuth = facultyCredentials[formData.email];
      if (facultyAuth && facultyAuth.password === formData.password) {
        localStorage.setItem('userRole', 'faculty');
        localStorage.setItem('facultyId', facultyAuth.id);
        onLoginSuccess('faculty', facultyAuth.id);
      } else {
        alert('Invalid faculty credentials');
      }
    } else if (selectedRole === 'admin') {
      const adminAuth = adminCredentials[formData.email];
      if (adminAuth && adminAuth.password === formData.password) {
        localStorage.setItem('userRole', 'admin');
        onLoginSuccess('admin');
      } else {
        alert('Invalid admin credentials');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <div className="role-selector">
          <div className="role-tabs">
            <button 
              className={`role-tab ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => setSelectedRole('admin')}
            >
              Admin
            </button>
            <button 
              className={`role-tab ${selectedRole === 'faculty' ? 'active' : ''}`}
              onClick={() => setSelectedRole('faculty')}
            >
              Faculty
            </button>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>


          <div className="form-group">
            <label htmlFor="email">Email / Username</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email or username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>



          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-password">Forgot Password?</button>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="form-footer">
          <p>
            Don't have an account? 
            <button className="toggle-btn" onClick={onToggleToSignup}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;