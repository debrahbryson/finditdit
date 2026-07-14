import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MapPin, Calendar, User, ArrowLeft, Send, CheckCircle, XCircle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemRes, claimsRes] = await Promise.all([
          api.get(`/items/${id}`),
          api.get(`/claims/item/${id}`)
        ]);
        setItem(itemRes.data);
        setClaims(Array.isArray(claimsRes.data) ? claimsRes.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleClaim = async () => {
    if (!message.trim()) return toast.error('Please enter a message');
    setClaiming(true);
    try {
      await api.post('/claims', { itemId: id, message });
      toast.success('Claim submitted!');
      setMessage('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit claim');
    } finally {
      setClaiming(false);
    }
  };

  const handleClaimStatus = async (claimId, status) => {
    try {
      await api.put(`/claims/${claimId}/status?status=${status}`);
      toast.success(`Claim ${status.toLowerCase()}`);
      const res = await api.get(`/claims/item/${id}`);
      setClaims(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error('Failed to update claim');
    }
  };

  if (loading) return (
    <div className="min-h-screen relative z-10">
      <Navbar />
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!item) return (
    <div className="min-h-screen relative z-10">
      <Navbar />
      <div className="flex items-center justify-center h-96">
        <p className="text-white/50">Item not found.</p>
      </div>
    </div>
  );

  const isOwner = item.postedBy?.email === user.email;
  const statusConfig = {
    LOST: { bg: 'bg-red-500' },
    FOUND: { bg: 'bg-emerald-500' },
    CLAIMED: { bg: 'bg-amber-500' },
    RESOLVED: { bg: 'bg-gray-400' },
  };
  const config = statusConfig[item.status] || statusConfig.LOST;

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-yellow-400 mb-6 transition font-medium">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6">

            <div className="glass rounded-3xl overflow-hidden border border-yellow-400/10">
              <div className="relative bg-black/20">
                <img
                  src={item.imageUrl ? encodeURI(item.imageUrl) : 'https://placehold.co/800x400?text=No+Image'}
                  alt={item.title}
                  className="w-full object-contain max-h-96"
                />
                <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-sm font-semibold ${config.bg}`}>
                  {item.status}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-white/60 leading-relaxed mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-white/40">
                  <span className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                    <MapPin size={14} className="text-yellow-400" />{item.location}
                  </span>
                  <span className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                    <Calendar size={14} className="text-yellow-400" />{new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                    <User size={14} className="text-yellow-400" />{item.postedBy?.fullName}
                  </span>
                </div>
              </div>
            </div>

            {isOwner && claims.length > 0 && (
              <div className="glass rounded-3xl p-6 border border-yellow-400/10">
                <h3 className="font-bold text-white mb-4 text-lg">
                  Claims <span className="text-yellow-400">({claims.length})</span>
                </h3>
                <div className="space-y-4">
                  {claims.map((claim) => (
                    <div key={claim.id} className="glass-dark rounded-2xl p-4 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-800 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {claim.claimedBy?.fullName?.charAt(0)}
                          </div>
                          <p className="font-medium text-white text-sm">{claim.claimedBy?.fullName}</p>
                        </div>
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          claim.status === 'PENDING' ? 'bg-yellow-400/10 text-yellow-400' :
                          claim.status === 'ACCEPTED' ? 'bg-emerald-400/10 text-emerald-400' :
                          'bg-red-400/10 text-red-400'
                        }`}>
                          {claim.status === 'PENDING' ? <Clock size={10} /> :
                           claim.status === 'ACCEPTED' ? <CheckCircle size={10} /> :
                           <XCircle size={10} />}
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm mb-3 pl-10">{claim.message}</p>
                      {claim.status === 'PENDING' && (
                        <div className="flex gap-2 pl-10">
                          <button onClick={() => handleClaimStatus(claim.id, 'ACCEPTED')}
                            className="flex-1 bg-emerald-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-emerald-600 transition">
                            ✓ Accept
                          </button>
                          <button onClick={() => handleClaimStatus(claim.id, 'REJECTED')}
                            className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition">
                            ✗ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="glass rounded-3xl p-6 border border-yellow-400/10">
              <h3 className="font-bold text-white mb-4">Posted by</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.postedBy?.fullName?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.postedBy?.fullName}</p>
                  <p className="text-xs text-yellow-400 flex items-center gap-1">
                    <CheckCircle size={11} /> Verified DIT Member
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-yellow-400/10">
              <h3 className="font-bold text-white mb-4">Item Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Category', value: item.category },
                  { label: 'Location', value: item.location },
                  { label: 'Posted', value: new Date(item.createdAt).toLocaleDateString() },
                ].map((d) => (
                  <div key={d.label} className="flex items-center justify-between">
                    <span className="text-white/40 text-sm">{d.label}</span>
                    <span className="text-white text-sm font-medium">{d.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">Status</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full text-white ${config.bg}`}>{item.status}</span>
                </div>
              </div>
            </div>

            {!isOwner && item.status === 'LOST' && (
              <div className="glass rounded-3xl p-6 border border-yellow-400/10">
                <h3 className="font-bold text-white mb-1">Submit a Claim</h3>
                <p className="text-white/40 text-xs mb-4">Describe how you found this item or prove ownership</p>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="I found this item near..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400/50 text-white text-sm resize-none placeholder-white/30 mb-3"
                  rows={4} />
                <button onClick={handleClaim} disabled={claiming}
                  className="w-full bg-gradient-to-r from-blue-800 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send size={16} />
                  {claiming ? 'Submitting...' : 'Submit Claim'}
                </button>
              </div>
            )}

            {isOwner && (
              <div className="glass rounded-3xl p-6 text-center border border-yellow-400/20">
                <div className="w-10 h-10 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <User size={18} className="text-yellow-400" />
                </div>
                <p className="text-yellow-400 font-semibold text-sm">This is your item</p>
                <p className="text-white/30 text-xs mt-1">Claims from others appear on the left</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;