import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/notifications').then((res) => {
      setNotifications(res.data);
      setLoading(false);
    });
  }, []);

  const markAsRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-gray-400 py-20">No notifications yet.</div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <motion.div key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => !n.read && markAsRead(n.id)}
                className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition ${
                  n.read ? 'bg-white' : 'bg-blue-50 border border-blue-100'
                }`}>
                <Bell size={20} className={n.read ? 'text-gray-400' : 'text-blue-500'} />
                <div>
                  <p className={`text-sm ${n.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;