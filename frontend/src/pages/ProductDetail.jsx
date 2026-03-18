import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setProduct(null);
        } else {
          console.log('Frontend fetched product detail payload:', data);
          setProduct(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        addToast('Failed to load product details.', 'error');
        setLoading(false);
      });
  }, [id, addToast]);

  const handleAdd = () => {
    if(product) {
      addToCart(product);
      addToast(`${product.name} added to cart!`, 'success');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-appleGray border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-bold text-appleDark mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-accent hover:underline flex items-center gap-2">
           <ArrowLeft size={20} /> Back to Shop
        </Link>
      </div>
    );
  }

  const ingredientsList = product.ingredients || [];
  const benefitsList = product.benefits || [];

  return (
    <div className="bg-white min-h-[calc(100vh-4rem)] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-appleDark/60 hover:text-accent font-medium mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Products
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image & Stats */}
          <div className="sticky top-24">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-appleGray/30 rounded-3xl p-12 aspect-square flex items-center justify-center relative border border-appleGray"
            >
              <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full font-bold text-accent shadow-sm flex items-center gap-2">
                 <ShieldCheck size={18} /> Premium Quality
              </div>
              <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="bg-appleGray/30 p-6 rounded-2xl border border-appleGray text-center">
                 <p className="text-appleDark/60 text-sm font-medium mb-1">Servings</p>
                 <p className="text-2xl font-bold text-appleDark">{product.stats?.servings?.includes('~') ? product.stats.servings : `~${product.stats?.servings || '30'}`}</p>
               </div>
               <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10 text-center">
                 <p className="text-accent/80 text-sm font-medium mb-1">Key Profile</p>
                 <p className="text-2xl font-bold text-accent">{product.stats?.proteins || '25g Protein'}</p>
               </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex flex-col"
          >
            <div className="mb-2">
              <span className="text-sm font-bold tracking-widest text-accent uppercase">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-6 leading-tight">{product.name}</h1>
            
            <p className="text-xl font-medium text-appleDark/80 mb-6">
              {product.shortDescription}
            </p>

            {product.description && (
              <div className="mb-8 border-b border-appleGray pb-8">
                <h3 className="text-xl font-bold text-appleDark mb-3">Product Analysis</h3>
                <p className="text-lg font-light text-appleDark/70 whitespace-pre-wrap">{product.description}</p>
              </div>
            )}

            <div className="mb-10 flex items-end gap-6 border-b border-appleGray pb-8 pt-4">
               <div>
                  <p className="text-sm text-appleDark/50 font-medium mb-1">Premium Price</p>
                  <p className="text-5xl font-bold text-appleDark tracking-tight">₹{product.price}</p>
               </div>
               <button 
                 onClick={handleAdd}
                 className="flex-grow bg-accent text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-yellow-600 transition-all duration-300 shadow-xl shadow-accent/20 flex items-center justify-center gap-3 transform hover:-translate-y-1"
               >
                  Add to Cart <ChevronRight size={24} />
               </button>
            </div>

            <div className="space-y-10">
               <div>
                 <h3 className="text-2xl font-bold text-appleDark mb-4 flex items-center gap-2">
                   <Info className="text-accent" /> Key Benefits
                 </h3>
                 <ul className="space-y-3">
                   {benefitsList.map((benefit, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={24} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-lg text-appleDark/80">{benefit}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <div>
                 <h3 className="text-xl font-bold text-appleDark mb-4">Core Ingredients</h3>
                 <div className="flex flex-wrap gap-2">
                   {ingredientsList.map((ing, i) => (
                     <span key={i} className="bg-appleGray text-appleDark px-4 py-2 rounded-full font-medium text-sm">
                       {ing}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
