import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect bg-white/90 backdrop-blur-md border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold tracking-widest text-appleDark">
              COGGEN<span className="font-light">NUTRITION</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-appleDark/80 hover:text-appleDark px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/shop" className="text-appleDark/80 hover:text-appleDark px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
              <Link to="/admin" className="text-appleDark/80 hover:text-appleDark px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-appleDark/80 hover:text-appleDark transition-colors">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
