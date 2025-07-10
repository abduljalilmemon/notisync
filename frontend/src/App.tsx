import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import NotificationList from './components/NotificationList';
import axios from 'axios';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setNotifications(response.data);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  if (!token) {
    return <LoginForm onLoginSuccess={(t) => {
      localStorage.setItem('token', t);
      setToken(t);
    }} />;
  }

  return <NotificationList notifications={notifications} />;
}

export default App;
