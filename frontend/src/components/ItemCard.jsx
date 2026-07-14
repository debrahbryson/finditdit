import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

function ItemCard({ item }) {
  const statusConfig = {
    LOST: { bg: 'bg-red-500', dot: 'bg-red-400' },
    FOUND: { bg: 'bg-emerald-500', dot: 'bg-emerald-400' },
    CLAIMED: { bg: 'bg-amber-500', dot: 'bg-amber-400' },
    RESOLVED: { bg: 'bg-gray-400', dot: 'bg-gray-300' },
  };

  const config = statusConfig[item.status] || statusConfig.LOST;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
      className="glass rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300">
      <div className="relative overflow-hidden bg-black/20">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-base mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-white/50 text-sm mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
          <span className="flex items-center gap-1"><MapPin size={11} />{item.location}</span>
          <span className="flex items-center gap-1"><Calendar size={11} />{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>

        <Link to={`/items/${item.id}`}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-800 to-yellow-500 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
          View Details <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

export default ItemCard;