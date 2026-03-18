import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-appleGray rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-appleDark/40" />
          </div>
          <h2 className="text-2xl font-bold text-appleDark mb-4">Your bag is empty</h2>
          <p className="text-appleDark/60 mb-8">Let's find some premium fuel for your workouts.</p>
          <Link to="/shop" className="bg-appleDark text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-colors">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Review your bag.</h1>
      
      <div className="space-y-6 mb-8">
        {cartItems.map((item) => (
          <motion.div 
            layout
            key={item.id} 
            className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-appleGray"
          >
            <div className="w-24 h-24 bg-appleGray/30 rounded-xl p-2 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>
            
            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-lg font-bold text-appleDark">{item.name}</h3>
              <p className="text-sm font-medium text-accent">{item.category}</p>
            </div>
            
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="flex items-center bg-appleGray rounded-full p-1">
                <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="text-center sm:text-right min-w-[100px]">
              <p className="text-xl font-medium">₹{item.price * item.quantity}</p>
            </div>
            
            <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors mx-auto sm:mx-0 block">
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-appleGray flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg text-appleDark/60">Total Estimated</p>
          <p className="text-3xl font-bold text-appleDark">₹{cartTotal}</p>
        </div>
        <Link to="/checkout" className="w-full md:w-auto bg-appleDark text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-black transition-colors text-center">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
