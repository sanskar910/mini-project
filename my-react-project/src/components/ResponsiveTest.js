import React from 'react';
import '../assets/mobile-responsive.css';

const ResponsiveTest = () => {
  return (
    <div className="responsive-container">
      <h1 className="responsive-text">Responsive Design Test</h1>
      
      <div className="responsive-grid">
        <div style={{background: '#f0f0f0', padding: '1rem', borderRadius: '8px'}}>
          <h3>Mobile First</h3>
          <p>This layout adapts from mobile to desktop</p>
        </div>
        <div style={{background: '#e0e0e0', padding: '1rem', borderRadius: '8px'}}>
          <h3>Touch Friendly</h3>
          <button className="touch-friendly" style={{background: '#007bff', color: 'white', border: 'none', borderRadius: '4px'}}>
            Test Button
          </button>
        </div>
        <div style={{background: '#d0d0d0', padding: '1rem', borderRadius: '8px'}}>
          <h3>Responsive Forms</h3>
          <div className="responsive-form">
            <input type="text" placeholder="Test input" />
            <button>Submit</button>
          </div>
        </div>
      </div>
      
      <div style={{marginTop: '2rem'}}>
        <h2>Screen Size Info</h2>
        <p>Resize your browser to test responsiveness:</p>
        <ul>
          <li>Mobile: &lt; 768px</li>
          <li>Tablet: 768px - 1024px</li>
          <li>Desktop: &gt; 1024px</li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveTest;