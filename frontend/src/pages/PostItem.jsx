import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Upload, MapPin, Tag, FileText, Link as LinkIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const CATEGORIES = ['ID Card', 'Laptop', 'Phone', 'Bag', 'Books', 'Keys', 'Wallet', 'Headphones', 'Earphones', 'Charger', 'Cable', 'Water Bottle', 'Shoes', 'Other'];
const LOCATIONS = ['Block A', 'Block B', 'Block C', 'Library', 'Cafeteria', 'Lab', 'Parking', 'Other'];

function PostItem() {
  const [form, setForm] = useState({ title: '', description: '', category: '', location: '', imageUrl: '', status: 'LOST' });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/upload/image', formData);
      setForm({ ...form, imageUrl: res.data.url });
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/items', form);
      toast.success('Item posted successfully!');
      navigate('/home');
    } catch (err) {
      toast.error('Failed to post item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white mb-1">Post an Item</h2>
          <p className="text-white/60 text-sm mb-6">Report a lost or found item on campus</p>

          <div className="glass-card rounded-3xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl">
                {['LOST', 'FOUND'].map((s) => (
                  <button key={s} type="button" onClick={() => setForm({ ...form, status: s })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                      form.status === s
                        ? s === 'LOST'
                          ? 'bg-red-500 text-white shadow-md'
                          : 'bg-emerald-500 text-white shadow-md'
                        : 'text-gray-500'
                    }`}>
                    {s === 'LOST' ? '🔍 I Lost Something' : '✅ I Found Something'}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="title" value={form.title} onChange={handleChange} required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="e.g. Blue Backpack" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                  placeholder="Describe the item in detail — color, brand, distinguishing features..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <Tag size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <select name="category" value={form.category} onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <select name="location" value={form.location} onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                      <option value="">Select location</option>
                      {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image <span className="text-gray-400">(optional)</span>
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="Paste image URL or upload below..." />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-3 cursor-pointer hover:border-indigo-400 transition">
                      <Upload size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {uploading ? 'Uploading...' : imageFile ? imageFile.name : 'Upload from device'}
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    {form.imageUrl && (
                      <img src={form.imageUrl} alt="preview"
                        className="w-16 h-16 object-cover rounded-xl border border-gray-200" />
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading || uploading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50">
                <Upload size={16} />
                {loading ? 'Posting...' : 'Post Item'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PostItem;