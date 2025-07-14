import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  username: string;
  is_staff: boolean;
}

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/me/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user info:', err);
    }
  };

  const login = (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setAccessToken(access);
  };

  const logout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setUser(null);
    setShowLogoutModal(false);
  };

  const cancelLogout = () => setShowLogoutModal(false);

  return {
    accessToken,
    isAuthenticated: !!accessToken,
    user,
    login,
    logout,
    showLogoutModal,
    confirmLogout,
    cancelLogout,
  };
}
