import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-appleDark text-white pt-20 pb-10 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white mb-6 block">
              COGGEN <span className="text-accent">NUTRITION</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium sports nutrition engineered for maximum performance. Uncompromising quality for uncompromising athletes.
            </p>
            <div className="flex items-center gap-2 text-accent font-mono text-sm">
               <ShieldCheck size={16} />
               <span>FSSAI: 22723444000173</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60 hover:*:text-accent transition-colors">
              <li><Link to="/shop">Shop Supplements</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/admin">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Legal & Policies</h4>
            <ul className="space-y-4 text-sm text-white/60 hover:*:text-accent transition-colors">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                 <MapPin size={16} className="text-accent shrink-0 mt-1" />
                 <span>Hasnain Traders<br/>Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                 <Mail size={16} className="text-accent" />
                 <a href="mailto:support@coggen.in" className="hover:text-white transition-colors">support@coggen.in</a>
              </li>
              <li className="flex items-center gap-3">
                 <Phone size={16} className="text-accent" />
                 <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Coggen Nutrition. All rights reserved.</p>
          <div className="flex gap-4">
             <span>*Statements have not been evaluated by the FDA.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
