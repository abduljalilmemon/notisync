import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import LoginForm from './features/auth/components/LoginForm';
import LogoutModal from './features/auth/components/LogoutModal';
import NotificationList from './features/notifications/components/NotificationList';
import TemplateManager from './features/templates/components/TemplateManager';
import Sidebar from './components/Sidebar';
import { useAuth } from './features/auth/hooks/useAuth';
import routes from './routes/AppRoutes';

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
      return (
        <Routes>
          {routes.map(({ layout, pages }) =>
            layout === "auth"
              ? pages.map(({ path }) => {
                  if (path === "sign-in") {
                    return (
                      <Route
                        key={path}
                        path={`/auth/${path}`}
                        element={<LoginForm onLoginSuccess={login} />}
                      />
                    );
                  }
                  return null;
                })
              : null
          )}
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>
      );
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
