import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/claims/my').then((res) => {
      setClaims(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    });
  }, []);

  const statusConfig = {
    PENDING: { bg: 'border-yellow-400/30', badge: 'bg-yellow-400/10 text-yellow-400', icon: <Clock size={14} /> },
    ACCEPTED: { bg: 'border-emerald-400/30', badge: 'bg-emerald-400/10 text-emerald-400', icon: <CheckCircle size={14} /> },
    REJECTED: { bg: 'border-red-400/30', badge: 'bg-red-400/10 text-red-400', icon: <XCircle size={14} /> },
  };

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-1">My Claims</h2>
        <p className="text-white/50 text-sm mb-6">Track the status of your submitted claims</p>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <div key={i} className="glass rounded-2xl h-24 animate-pulse" />)}
          </div>
        ) : claims.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-yellow-400" />
            </div>
            <p className="text-white/70 font-medium">No claims yet</p>
            <p className="text-white/40 text-sm mt-1">When you claim an item it will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim, i) => {
              const config = statusConfig[claim.status] || statusConfig.PENDING;
              return (
                <motion.div key={claim.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass border rounded-2xl p-5 ${config.bg}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{claim.item?.title}</h3>
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.badge}`}>
                      {config.icon} {claim.status}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm mb-2">{claim.message}</p>
                  <p className="text-xs text-white/30">{new Date(claim.createdAt).toLocaleDateString()}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyClaims;