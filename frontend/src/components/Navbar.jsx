import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, LogOut, PlusCircle, Home, FileText, Search } from 'lucide-react';

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
    <nav className="glass-dark border-b border-yellow-400/20 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/home" className="flex items-center gap-3">
        <img src="/images/dit-logo.png" alt="DIT Logo" className="w-10 h-10 object-contain" />
        <div>
          <span className="text-xl font-bold text-white">FindIt </span>
          <span className="text-xl font-bold text-yellow-400">DIT</span>
        </div>
      </Link>

      <div className="flex items-center gap-1">
        {[
          { path: '/home', icon: <Home size={16} />, label: 'Home' },
          { path: '/post-item', icon: <PlusCircle size={16} />, label: 'Post Item' },
          { path: '/my-claims', icon: <FileText size={16} />, label: 'My Claims' },
          { path: '/notifications', icon: <Bell size={16} />, label: 'Notifications' },
        ].map((item) => (
          <Link key={item.path} to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              isActive(item.path)
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}>
            {item.icon} {item.label}
          </Link>
        ))}
        {user.role === 'ADMIN' && (
          <Link to="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
              isActive('/admin') ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}>
            Admin
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-800 to-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold border border-yellow-400/30">
          {user.fullName?.charAt(0) || 'U'}
        </div>
        <span className="text-white/60 text-sm">{user.fullName?.split(' ')[0]}</span>
        <button onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400 transition">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;