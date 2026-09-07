import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f8f8', padding: '20px', borderTop: '1px solid #e7e7e7', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexwrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap:'20px' }}>
            <div>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>ShopNest</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Premium E-Commerce Platform.</p>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/about" style={{ color: '#333', fontSize: '0.9rem' }}>About Us</Link>
                <Link to="/return" style={{ color: '#333', fontSize: '0.9rem' }}>Return Policy</Link>
                <Link to="/disclaimer" style={{ color: '#333', fontSize: '0.9rem' }}>Disclaimer</Link>
            </div>    
        </div>
    </footer>
  );
};

export default Footer;

