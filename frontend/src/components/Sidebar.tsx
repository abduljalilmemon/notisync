
export default function Sidebar({ onLogoutClick }: { onLogoutClick: () => void }) {
  return (
    <div className="w-60 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">NotiSync</h2>
      <ul className="space-y-2">
        <li>Dashboard</li>
        <li>Notifications</li>
        <li>Templates</li>
      </ul>
      <button
        onClick={onLogoutClick}
        className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
