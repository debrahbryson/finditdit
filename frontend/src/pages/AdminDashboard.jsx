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
    api.get('/admin/users').then((res) => setUsers(res.data));
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
            { label: 'Total Users', value: stats.totalUsers, icon: <Users size={24} />, color: 'blue' },
            { label: 'Total Items', value: stats.totalItems, icon: <Package size={24} />, color: 'green' },
            { label: 'Valid IDs', value: stats.validIds, icon: <ShieldCheck size={24} />, color: 'purple' },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl shadow-md p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${s.color}-100 text-${s.color}-600`}>{s.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value ?? '...'}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card rounded-2xl shadow-md p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Upload Valid DIT IDs (CSV)</h3>
          <p className="text-sm text-gray-500 mb-4">CSV format: <code>DIT_ID, STUDENT</code> or <code>DIT_ID, STAFF</code></p>
          <div className="flex gap-4">
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2" />
            <button onClick={handleUpload} disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        <div className="glass-card rounded-2xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Registered Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">DIT ID</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Verified</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{u.fullName}</td>
                    <td className="py-3 text-gray-500">{u.email}</td>
                    <td className="py-3 text-gray-500">{u.ditId}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === 'ADMIN' ? 'bg-red-100 text-red-600' :
                        u.role === 'STAFF' ? 'bg-purple-100 text-purple-600' :
                        'bg-blue-100 text-blue-600'
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