"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface UserData {
  id: string;
  avatar: string;
  username: string;
  discriminator: string;
  // Add more properties as needed
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Retrieve the access token from the cookie
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
      // Make API request to get user data
      const fetchUserData = async () => {
        try {
          const response = await axios.get<UserData>('https://discord.com/api/v10/users/@me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <img src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`} alt="User Avatar" />
          <p>Username: {userData.username}</p>
          <p>Discriminator: {userData.discriminator}</p>
          {/* Display more user information as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
