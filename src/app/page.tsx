"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Loader from '../components/loader';

interface UserData {
  id: string;
  avatar: string;
  username: string;
  discriminator: string;
}

interface Guild {
  id: string;
  name: string;
  icon: string | null;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
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

      const fetchUserGuilds = async () => {
        try {
          const response = await axios.get<Guild[]>('https://discord.com/api/v10/users/@me/guilds', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setGuilds(response.data);
        } catch (error) {
          console.error('Error fetching user guilds:', error);
        }
      };

      fetchUserData();
      fetchUserGuilds();
      setLoading(false);
    }
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('access_token');
    router.push('/Login');
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        {loading ? (
          <Loader>Loading user data...</Loader>
        ) : userData ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`} alt="User Avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '10px' }} />
              <div>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '4px' }}>{userData.username}</p>
                <p style={{ color: '#717171' }}>Discriminator: {userData.discriminator}</p>
              </div>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>Groups Joined:</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {guilds.map((guild) => (
                <li key={guild.id} style={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
                  {guild.icon && <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt="Guild Icon" style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '10px' }} />}
                  <p style={{ color: '#333', fontSize: '1.1rem' }}>{guild.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#F87171',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '20px',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
