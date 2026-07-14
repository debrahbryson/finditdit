import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, PlusCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import api from '../api/axios';

const FILTERS = ['ALL', 'LOST', 'FOUND', 'CLAIMED', 'RESOLVED'];

const filterColors = {
  ALL: 'from-blue-800 to-yellow-500',
  LOST: 'from-red-500 to-rose-600',
  FOUND: 'from-emerald-500 to-teal-600',
  CLAIMED: 'from-amber-500 to-orange-600',
  RESOLVED: 'from-gray-400 to-gray-500',
};

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => { fetchItems(); }, [filter]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const url = filter === 'ALL' ? '/items/browse' : `/items/browse?status=${filter}`;
      const res = await api.get(url);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return fetchItems();
    try {
      const res = await api.get(`/items/search?keyword=${search}`);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  const lostCount = items.filter(i => i.status === 'LOST').length;
  const foundCount = items.filter(i => i.status === 'FOUND').length;

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero */}
      <div className="glass-dark border-b border-yellow-400/10 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400/80 text-sm font-medium mb-2">Welcome back, {user.fullName?.split(' ')[0]} 👋</p>
            <h1 className="text-4xl font-bold mb-2 text-white">DIT Lost & Found</h1>
            <p className="text-white/50 mb-8">Helping the DIT community reunite with their belongings</p>

            <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-white/30" size={18} />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for lost or found items..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50" />
              </div>
              <button type="submit"
                className="bg-gradient-to-r from-blue-800 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg">
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 -mt-6">
          {[
            { label: 'Total Items', value: items.length, color: 'from-blue-800 to-yellow-500' },
            { label: 'Lost Items', value: lostCount, color: 'from-red-500 to-rose-600' },
            { label: 'Found Items', value: foundCount, color: 'from-emerald-500 to-teal-600' },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl shadow-md p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  filter === f
                    ? `bg-gradient-to-r ${filterColors[f]} text-white shadow-md`
                    : 'glass text-white/60 hover:text-white'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <Link to="/post-item"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-800 to-yellow-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-md">
            <PlusCircle size={16} /> Post Item
          </Link>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-yellow-400" />
            </div>
            <p className="text-white/70 font-medium">No items found</p>
            <p className="text-white/40 text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Masonry
              breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
              className="flex gap-6"
              columnClassName="flex flex-col gap-6">
              {items.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <ItemCard item={item} />
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Home;