import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/notifications').then((res) => { setNotifications(Array.isArray(res.data) ? res.data : []); setLoading(false); });
  }, []);

  const markAsRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
            {unreadCount > 0 && <p className="text-sm text-indigo-600 mt-1">{unreadCount} unread</p>}
          </div>
          {unreadCount > 0 && (
            <button onClick={() => notifications.filter(n => !n.read).forEach(n => markAsRead(n.id))}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition">
              <CheckCheck size={16} /> Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-16 animate-pulse" />)}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell size={28} className="text-indigo-400" />
            </div>
            <p className="text-gray-500 font-medium">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => !n.read && markAsRead(n.id)}
                className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition border ${
                  n.read ? 'glass border-white/10' : 'glass border-indigo-400/30'
                }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.read ? 'bg-gray-100' : 'bg-indigo-100'
                }`}>
                  <Bell size={18} className={n.read ? 'text-gray-400' : 'text-indigo-600'} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${n.read ? 'text-white/50' : 'text-white font-medium'}`}>{n.message}</p>
                  <p className="text-xs text-white/40 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;