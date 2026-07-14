import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../api/axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Welcome back!');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
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
              Reuniting DIT with their belongings
            </h2>
            <p className="text-white/50 text-sm">Report lost items, find what others discovered, and connect with your campus community.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {['Lost Items', 'Found Items', 'Claims', 'Verified IDs'].map((tag) => (
              <span key={tag} className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-xs px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="glass p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-white/50 text-sm mb-8">Sign in to your DIT account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-white/40 mt-6 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-400 font-semibold hover:underline">Register</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;