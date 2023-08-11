"use client"
import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    const clientId = '1139069996178341979';
    const redirectUri = encodeURIComponent('http://localhost:3000/auth');
    const scopes = encodeURIComponent('identify email guilds');
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`;

    window.location.href = authUrl;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
      <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>Welcome to My App</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', textAlign: 'center' }}>Please log in using your Discord account</p>
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: '#7289DA',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'block',
            margin: '0 auto',
          }}
        >
          Login with Discord
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
