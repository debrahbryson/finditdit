import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, PlusCircle, Home, FileText } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/home" className="text-2xl font-bold text-blue-600">
        FindIt <span className="text-gray-800">DIT</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/home" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <Home size={18} /> Home
        </Link>
        <Link to="/post-item" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <PlusCircle size={18} /> Post Item
        </Link>
        <Link to="/my-claims" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <FileText size={18} /> My Claims
        </Link>
        <Link to="/notifications" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <Bell size={18} /> Notifications
        </Link>
        {user.role === 'ADMIN' && (
          <Link to="/admin" className="text-red-500 hover:text-red-700 font-semibold">
            Admin
          </Link>
        )}
        <button onClick={logout} className="flex items-center gap-1 text-gray-600 hover:text-red-500">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;