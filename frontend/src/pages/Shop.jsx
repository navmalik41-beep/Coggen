import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Protein', 'Mass Gainer', 'Pre Workout', 'Amino', 'Health'];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold text-appleDark mb-4">Our Products</h2>
        <p className="text-appleDark/60 max-w-2xl mx-auto">Discover our premium range of scientifically formulated sports nutrition, designed to help you achieve your peak performance.</p>
      </motion.div>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all ${
                 selectedCategory === cat 
                   ? 'bg-appleDark text-white shadow-md' 
                   : 'bg-white text-appleDark/60 hover:bg-appleGray border border-appleGray'
               }`}
             >
               {cat}
             </button>
          ))}
        </div>
        
        <input 
          type="text" 
          placeholder="Search supplements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-5 py-3 rounded-full bg-white border border-appleGray focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all shadow-sm"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {[...Array(8)].map((_, i) => (
             <div key={i} className="animate-pulse bg-appleGray/50 rounded-3xl h-[400px]"></div>
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products
            .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
