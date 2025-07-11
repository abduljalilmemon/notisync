import React from 'react';

const NotificationList = ({ notifications }: { notifications: any[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'queued':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-extrabold mb-6">📩 Notifications</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notifications.map((n, idx) => (
          <div
            key={idx}
            className="bg-white text-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-1">{n.subject}</h2>
            <p className="text-sm text-gray-600 mb-2">{n.body}</p>
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(n.status)}`}>
                {n.status.toUpperCase()}
              </span>
              <span className="text-gray-500">{new Date(n.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
