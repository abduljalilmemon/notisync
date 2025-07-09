import React from 'react';

const NotificationList = ({ notifications }: { notifications: any[] }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-2">
        {notifications.map((n, idx) => (
          <li key={idx} className="border p-3 rounded shadow bg-white">
            <p className="text-gray-800">{n.message}</p>
            <p className="text-xs text-gray-400">{n.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
