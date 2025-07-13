import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/LoginForm';
import LogoutModal from './components/LogoutModal';
import NotificationList from './components/NotificationList';
import TemplateManager from './components/TemplateManager';


interface DecodedToken {
  username: string;
  exp: number;
  // Add other fields if needed
}

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<{ username: string; is_staff: boolean } | null>(null);



  useEffect(() => {
    if (accessToken) {
      const decoded: DecodedToken = jwtDecode(accessToken);
      fetchNotifications();
      fetchUserInfo(); 
    }
  }, [accessToken]);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/me/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(res)
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user info:', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setNotifications(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        const newAccess = await refreshAccessToken();
        if (newAccess) {
          setAccessToken(newAccess);
        } else {
          handleLogout(false); // logout silently
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
      const response = await axios.post('http://localhost:8000/api/refresh/', {
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

  const handleLogout = (askConfirm = true) => {
    if (askConfirm) {
      setShowLogoutModal(true);
      return;
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
  };

  const confirmLogout = () => {
    handleLogout(false);
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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

  return (
    <div className="min-h-screen bg-black-50">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-semibold"></h1>
        <button
          onClick={() => handleLogout(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <NotificationList notifications={notifications} />

      {user?.is_staff && <TemplateManager token={accessToken} />}

      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );

}

export default App;
