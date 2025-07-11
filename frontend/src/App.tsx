import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import NotificationList from './components/NotificationList';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (accessToken) {
      fetchNotifications();
    }
  }, [accessToken]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response)
      setNotifications(response.data);
    } catch (err: any) {
      // If token expired (401), try refreshing
      if (err.response?.status === 401) {
        const newAccess = await refreshAccessToken();
        if (newAccess) {
          setAccessToken(newAccess);
        } else {
          setAccessToken(null);
        }
      } else {
        console.error('Failed to fetch notifications', err);
      }
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refreshToken,
      });
      const newAccess = response.data.access;
      localStorage.setItem('access_token', newAccess);
      return newAccess;
    } catch (err) {
      console.error('Refresh token failed', err);
      return null;
    }
  };

  if (!accessToken) {
    return (
      <LoginForm
        onLoginSuccess={(access: string, refresh: string) => {
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          setAccessToken(access);
        }}
      />
    );
  }

  return <NotificationList notifications={notifications} />;
}

export default App;
