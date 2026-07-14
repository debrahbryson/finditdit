import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Users, Package, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data));
    api.get('/admin/users').then((res) => setUsers(Array.isArray(res.data) ? res.data : []));
  }, []);

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a CSV file');
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await api.post('/admin/upload-ids', formData);
      toast.success(res.data.message);
      setFile(null);
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: <Users size={24} />, color: 'from-blue-800 to-yellow-500' },
            { label: 'Total Items', value: stats.totalItems, icon: <Package size={24} />, color: 'from-emerald-600 to-teal-500' },
            { label: 'Valid IDs', value: stats.validIds, icon: <ShieldCheck size={24} />, color: 'from-purple-600 to-indigo-500' },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 flex items-center gap-4 border border-yellow-400/10">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-white/50 text-sm">{s.label}</p>
                <p className="text-2xl font-bold text-white">{s.value ?? '...'}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 mb-8 border border-yellow-400/10">
          <h3 className="font-semibold text-white mb-1">Upload Valid DIT IDs (CSV)</h3>
          <p className="text-sm text-white/40 mb-4">CSV format: <code className="text-yellow-400">DIT_ID, STUDENT</code> or <code className="text-yellow-400">DIT_ID, STAFF</code></p>
          <div className="flex gap-4">
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/60 text-sm" />
            <button onClick={handleUpload} disabled={uploading}
              className="bg-gradient-to-r from-blue-800 to-yellow-500 text-white px-6 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50 font-medium">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-yellow-400/10">
          <h3 className="font-semibold text-white mb-4">Registered Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/30 border-b border-white/10">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">DIT ID</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Verified</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 last:border-0">
                    <td className="py-3 font-medium text-white">{u.fullName}</td>
                    <td className="py-3 text-white/50">{u.email}</td>
                    <td className="py-3 text-white/50">{u.ditId}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === 'ADMIN' ? 'bg-yellow-400/10 text-yellow-400' :
                        u.role === 'STAFF' ? 'bg-purple-400/10 text-purple-400' :
                        'bg-blue-400/10 text-blue-400'
                      }`}>{u.role}</span>
                    </td>
                    <td className="py-3">{u.verified ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;