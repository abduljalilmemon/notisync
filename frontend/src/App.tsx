import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './features/auth/components/LoginForm';
import LogoutModal from './features/auth/components/LogoutModal';
import NotificationList from './features/notifications/components/NotificationList';
import TemplateManager from './features/templates/components/TemplateManager';
import Sidebar from './components/Sidebar';
import { useAuth } from './features/auth/hooks/useAuth';

function App() {
  const {
    accessToken,
    isAuthenticated,
    user,
    login,
    logout,
    showLogoutModal,
    confirmLogout,
    cancelLogout,
  } = useAuth();

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (accessToken) {
      fetchNotifications();
    }
  }, [accessToken]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/notifications/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={login} />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogoutClick={logout} />
      <main className="flex-1 p-6 space-y-6 bg-gray-50">
        <NotificationList notifications={notifications} />
        {user?.is_staff && <TemplateManager token={accessToken!} />}
      </main>

      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}

export default App;
