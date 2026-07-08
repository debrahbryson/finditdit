import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

function ItemCard({ item }) {
  const statusColors = {
    LOST: 'bg-red-100 text-red-600',
    FOUND: 'bg-green-100 text-green-600',
    CLAIMED: 'bg-yellow-100 text-yellow-600',
    RESOLVED: 'bg-gray-100 text-gray-600',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <img
        src={item.imageUrl || 'https://placehold.co/400x200?text=No+Image'}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[item.status]}`}>
            {item.status}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><MapPin size={12} />{item.location}</span>
          <span className="flex items-center gap-1"><Calendar size={12} />{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
        <Link
          to={`/items/${item.id}`}
          className="block text-center bg-blue-600 text-white py-2 rounded-xl text-sm hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

export default ItemCard;