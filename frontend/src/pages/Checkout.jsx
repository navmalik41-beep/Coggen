import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: formData,
          cartItems,
          totalAmount: cartTotal
        })
      });
      
      const data = await res.json();
      if (data.success) {
        addToast('Order placed successfully!', 'success');
        setSuccess(true);
        clearCart();
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        addToast(data.error || 'Failed to process order.', 'error');
      }
    } catch (err) {
      addToast('Network error during checkout.', 'error');
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 w-24 h-24" />
          </div>
          <h2 className="text-3xl font-bold text-appleDark mb-4">Order Confirmed!</h2>
          <p className="text-appleDark/60 mb-8 max-w-md mx-auto">
            Thank you for choosing Coggen Nutrition. Your premium sports supplements are on their way.
          </p>
          <p className="text-sm text-appleDark/40">Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleCheckout} 
        className="bg-white p-8 rounded-2xl shadow-sm border border-appleGray space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-appleDark mb-2">First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleInputChange} required type="text" className="w-full px-4 py-3 rounded-lg bg-appleGray/50 border-none focus:ring-2 focus:ring-accent outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-appleDark mb-2">Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleInputChange} required type="text" className="w-full px-4 py-3 rounded-lg bg-appleGray/50 border-none focus:ring-2 focus:ring-accent outline-none transition-shadow" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-appleDark mb-2">Email Address</label>
          <input name="email" value={formData.email} onChange={handleInputChange} required type="email" className="w-full px-4 py-3 rounded-lg bg-appleGray/50 border-none focus:ring-2 focus:ring-accent outline-none transition-shadow" />
        </div>
        <div>
          <label className="block text-sm font-medium text-appleDark mb-2">Shipping Address</label>
          <textarea name="address" value={formData.address} onChange={handleInputChange} required rows="3" className="w-full px-4 py-3 rounded-lg bg-appleGray/50 border-none focus:ring-2 focus:ring-accent outline-none transition-shadow resize-none"></textarea>
        </div>
        
        <div className="pt-6 border-t border-appleGray mt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-appleDark">Total</span>
            <span className="text-2xl font-bold text-appleDark">₹{cartTotal}</span>
          </div>
          <button type="submit" className="w-full bg-appleDark text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-black transition-colors flex justify-center items-center">
            Place Demo Order
          </button>
        </div>
      </motion.form>
    </div>
  );
}
