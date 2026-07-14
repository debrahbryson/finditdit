import { useState } from 'react';
import { Link, useNavigate } from 'react-router-motion';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, User, CreditCard, ArrowRight } from 'lucide-react';
import api from '../api/axios';

function Register() {
  const [form, setForm] = useState({ ditId: '', fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-2 rounded-3xl shadow-2xl overflow-hidden border border-yellow-400/20">
        {/* Left Panel */}
        <div className="glass-dark p-10 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/dit-logo.png" alt="DIT" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-white font-bold text-lg">FindIt DIT</p>
              <p className="text-yellow-400 text-xs">Dar es Salaam Institute of Technology</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Join the FindIt DIT community
            </h2>
            <p className="text-white/50 text-sm">Only verified DIT students and staff can register.</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-yellow-400 text-sm font-medium mb-1">✅ DIT ID Verified</p>
            <p className="text-white/40 text-xs">Your student or staff ID must be pre-registered by the admin before you can create an account.</p>
          </div>
        </div>

        {/* Right Panel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="glass p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
          <p className="text-white/50 text-sm mb-6">Register with your DIT credentials</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">DIT ID</label>
              <div className="relative">
                <CreditCard size={16} className="absolute left-3 top-3.5 text-white/30" />
                <input type="text" name="ditId" value={form.ditId} onChange={handleChange} required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-400/50 text-white text-sm placeholder-white/30"
                  placeholder="e.g. 2024/BEng/COE/001" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3.5 text-white/30" />
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-400/50 text-white text-sm placeholder-white/30"
                  placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-white/30" />
                <input type="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-400/50 text-white text-sm placeholder-white/30"
                  placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-white/30" />
                <input type="password" name="password" value={form.password} onChange={handleChange} required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-400/50 text-white text-sm placeholder-white/30"
                  placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-blue-800 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? 'Creating account...' : <><span>Create Account</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-white/40 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-400 font-semibold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;