import React from 'react';

const About = () => {

  const containerStyle = {
    width: '90%',
    maxWidth: '900px',
    margin: '40px auto',
    padding: '40px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    textAlign: 'center',
    color: '#fff'
  };

  const profileImageStyle = {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #f97316',
    marginBottom: '20px',
    boxShadow: '0 4px 20px rgba(249,115,22,0.4)'
  };

  return (
    <div style={containerStyle}>

      <img
        src="/dp.png"
        alt="Ambike Jaiswal"
        style={profileImageStyle}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <h2
        style={{
          fontSize: '2.2rem',
          marginBottom: '10px',
          color: '#f97316',
          background: 'transparent',
          padding: 0
        }}
      >
        About Us
      </h2>

      <h3
        style={{
          fontSize: '1.4rem',
          color: '#fff',
          marginBottom: '20px'
        }}
      >
        Ambike Jaiswal
      </h3>

      <p
        style={{
          fontSize: '1.1rem',
          color: '#d4d4d8',
          lineHeight: '1.8',
          maxWidth: '600px',
          margin: '0 auto 25px auto'
        }}
      >
        <strong>Join the community and grow together!</strong>
        <br />
        Welcome to ShopNest, a modern e-commerce platform where we
        build, deploy, and scale highly scalable applications.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px'
        }}
      >

        <a
          href="https://www.linkedin.com/in/ambikejaiswal"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            background: '#27272a',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/ambikejaiswal"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            background: '#27272a',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          GitHub
        </a>

      </div>

    </div>
  );
};

export default About;