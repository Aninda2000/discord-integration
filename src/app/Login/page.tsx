"use client"
import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Construct the authorization URL
    const clientId = '1139069996178341979';
    const redirectUri = encodeURIComponent('http://localhost:3000/auth'); // Redirect URL after authentication
    const scopes = encodeURIComponent('identify email'); // Requested scopes
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`;

    // Redirect to the Discord authorization URL
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Discord</button>
    </div>
  );
};

export default LoginPage;
