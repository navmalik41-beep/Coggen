import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Plus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full"
    >
      <Link 
        to={`/product/${product.id}`}
        className="premium-shadow bg-white rounded-3xl p-6 border border-appleGray flex flex-col h-full group block"
      >
        <div className="relative aspect-square mb-6 bg-appleGray/30 rounded-2xl overflow-hidden p-4 flex items-center justify-center">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-grow flex flex-col">
          <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">{product.category}</p>
          <h3 className="text-xl font-bold text-appleDark leading-tight mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-appleDark/60 mb-6 line-clamp-2">{product.shortDescription}</p>
          
          <div className="mt-auto flex items-end justify-between">
            <div>
               <p className="text-sm text-appleDark/40 font-medium mb-1">Price</p>
               <p className="text-2xl font-bold text-appleDark">₹{product.price}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full bg-appleGray flex items-center justify-center text-appleDark hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Plus size={24} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
