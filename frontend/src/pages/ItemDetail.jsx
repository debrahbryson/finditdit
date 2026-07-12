import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MapPin, Calendar, User, ArrowLeft, Send } from 'lucide-react';
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
      setClaims(claimsRes.data);
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
      setClaims(res.data);
    } catch (err) {
      toast.error('Failed to update claim');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  const isOwner = item.postedBy?.email === user.email;
  const statusConfig = {
    LOST: 'bg-red-500',
    FOUND: 'bg-emerald-500',
    CLAIMED: 'bg-amber-500',
    RESOLVED: 'bg-gray-400',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-64">
                <img src={item.imageUrl || 'https://placehold.co/800x400?text=No+Image'}
                  alt={item.title} className="w-full h-full object-cover" />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${statusConfig[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="flex gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-400" />{item.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-indigo-400" />{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><User size={14} className="text-indigo-400" />{item.postedBy?.fullName}</span>
                </div>
              </div>
            </div>

            {/* Claims list for owner */}
            {isOwner && claims.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mt-6">
                <h3 className="font-bold text-gray-800 mb-4">Claims ({claims.length})</h3>
                <div className="space-y-3">
                  {claims.map((claim) => (
                    <div key={claim.id} className="border border-gray-100 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-800 text-sm">{claim.claimedBy?.fullName}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          claim.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                          claim.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}>{claim.status}</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">{claim.message}</p>
                      {claim.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <button onClick={() => handleClaimStatus(claim.id, 'ACCEPTED')}
                            className="flex-1 bg-emerald-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-emerald-600 transition">
                            Accept
                          </button>
                          <button onClick={() => handleClaimStatus(claim.id, 'REJECTED')}
                            className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition">
                            Reject
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
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-1">Posted by</h3>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {item.postedBy?.fullName?.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.postedBy?.fullName}</p>
                  <p className="text-xs text-gray-400">Verified DIT Student</p>
                </div>
              </div>

              {!isOwner && item.status === 'LOST' && (
                <>
                  <h3 className="font-bold text-gray-800 mb-3">Submit a Claim</h3>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how you found this item or prove ownership..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none mb-3"
                    rows={4} />
                  <button onClick={handleClaim} disabled={claiming}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50">
                    <Send size={16} />
                    {claiming ? 'Submitting...' : 'Submit Claim'}
                  </button>
                </>
              )}

              {isOwner && (
                <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                  <p className="text-indigo-600 text-sm font-medium">This is your item</p>
                  <p className="text-indigo-400 text-xs mt-1">You can see all claims on the left</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;