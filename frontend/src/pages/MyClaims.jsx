import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/claims/my').then((res) => {
      setClaims(res.data);
      setLoading(false);
    });
  }, []);

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-600',
    ACCEPTED: 'bg-green-100 text-green-600',
    REJECTED: 'bg-red-100 text-red-600',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Claims</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : claims.length === 0 ? (
          <div className="text-center text-gray-400 py-20">You haven't made any claims yet.</div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim) => (
              <motion.div key={claim.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{claim.item?.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[claim.status]}`}>
                    {claim.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{claim.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(claim.createdAt).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyClaims;