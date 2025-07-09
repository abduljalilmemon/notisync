import { useState } from 'react'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const sendNotification = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/notify/", {
        type: "email",
        user: email,
      })
      setMessage("Notification sent successfully!")
    } catch (err: any) {
      setMessage("Error sending notification")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Send Notification</h1>
      <input
        type="email"
        className="border px-4 py-2 rounded mb-2 w-full max-w-md"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={sendNotification}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Notification"}
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}

export default App
