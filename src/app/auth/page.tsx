"use client"
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthCallbackPage: React.FC = () => {
  useEffect(() => {
    // Extract access token from URL fragment
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get('access_token');

    if (accessToken) {
      // Store the access token securely in a cookie
      Cookies.set('access_token', accessToken, { expires: 7 });

      // Redirect to a protected route or the main app
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
      <p>Authenticating...</p>
    </div>
  );
};

export default AuthCallbackPage;
