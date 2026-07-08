import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MapPin, Calendar, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    api.get(`/items/${id}`).then((res) => {
      setItem(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleClaim = async () => {
    if (!message.trim()) return toast.error('Please enter a message');
    setClaiming(true);
    try {
      await api.post('/claims', { itemId: id, message });
      toast.success('Claim submitted successfully!');
      setMessage('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit claim');
    } finally {
      setClaiming(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-md overflow-hidden">
          <img src={item.imageUrl || 'https://placehold.co/800x400?text=No+Image'} alt={item.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'LOST' ? 'bg-red-100 text-red-600' :
                item.status === 'FOUND' ? 'bg-green-100 text-green-600' :
                'bg-gray-100 text-gray-600'
              }`}>{item.status}</span>
            </div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex gap-6 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1"><MapPin size={14} />{item.location}</span>
              <span className="flex items-center gap-1"><Calendar size={14} />{new Date(item.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><User size={14} />{item.postedBy?.fullName}</span>
            </div>

            {item.status === 'LOST' && item.postedBy?.email !== user.email && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Submit a Claim</h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe how you found this item or prove ownership..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  rows={4}
                />
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {claiming ? 'Submitting...' : 'Submit Claim'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ItemDetail;