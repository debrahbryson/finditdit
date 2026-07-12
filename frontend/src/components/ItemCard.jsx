import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

function ItemCard({ item }) {
  const statusConfig = {
    LOST: { bg: 'bg-red-500', light: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
    FOUND: { bg: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500' },
    CLAIMED: { bg: 'bg-amber-500', light: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' },
    RESOLVED: { bg: 'bg-gray-400', light: 'bg-gray-50 text-gray-600', dot: 'bg-gray-400' },
  };

  const config = statusConfig[item.status] || statusConfig.LOST;

  return (
    <motion.div
      whileHover={{ y: -6, shadow: 'xl' }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
<div className="relative overflow-hidden bg-gray-100">
  <img
    src={item.imageUrl ? encodeURI(item.imageUrl) : 'https://placehold.co/400x200?text=No+Image'}
    alt={item.title}
    className="w-full object-cover transition-transform duration-300 hover:scale-105"
  />
  <div className="absolute top-3 right-3">
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white ${config.bg}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></span>
      {item.status}
    </span>
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
</div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><MapPin size={11} />{item.location}</span>
          <span className="flex items-center gap-1"><Calendar size={11} />{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>

        <Link to={`/items/${item.id}`}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
          View Details <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

export default ItemCard;