import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, LogOut, PlusCircle, Home, FileText, Search } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/home" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Search size={16} className="text-white" />
        </div>
        <span className="text-xl font-bold">
          <span className="text-indigo-600">FindIt</span>
          <span className="text-white"> DIT</span>
        </span>
      </Link>

      <div className="flex items-center gap-1">
        {[
          { path: '/home', icon: <Home size={16} />, label: 'Home' },
          { path: '/post-item', icon: <PlusCircle size={16} />, label: 'Post Item' },
          { path: '/my-claims', icon: <FileText size={16} />, label: 'My Claims' },
          { path: '/notifications', icon: <Bell size={16} />, label: 'Notifications' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              isActive(item.path)
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-white/70 hover:bg-gray-50 hover:text-white'
            }`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
        {user.role === 'ADMIN' && (
          <Link to="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              isActive('/admin') ? 'bg-red-50 text-red-600' : 'text-white/70 hover:bg-gray-50'
            }`}>
            Admin
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {user.fullName?.charAt(0) || 'U'}
        </div>
        <button onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:bg-red-50 hover:text-red-500 transition">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;