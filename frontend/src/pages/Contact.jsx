import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white py-24 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-appleDark mb-6">Let's Connect.</h1>
          <p className="text-xl text-appleDark/60 max-w-2xl mx-auto">
            Have a question about our products, need support with an order, or want to discuss a partnership? We're here for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h2 className="text-2xl font-bold text-appleDark mb-8">Send us a message</h2>
             <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll get back to you soon."); }}>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-appleDark mb-2">First Name</label>
                   <input required type="text" className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-appleDark mb-2">Last Name</label>
                   <input required type="text" className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-appleDark mb-2">Email Address</label>
                 <input required type="email" className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-appleDark mb-2">Message</label>
                 <textarea required rows="5" className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all resize-none"></textarea>
               </div>
               <button type="submit" className="bg-appleDark text-white px-8 py-4 rounded-xl font-bold hover:bg-accent hover:shadow-lg transition-all flex items-center gap-2">
                 Send Message <Send size={18} />
               </button>
             </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-appleGray/30 p-12 rounded-3xl border border-appleGray h-fit">
             <h2 className="text-2xl font-bold text-appleDark mb-8">Contact Information</h2>
             <div className="space-y-8">
               <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-appleDark mb-1">Corporate HQ</h3>
                    <p className="text-appleDark/60 leading-relaxed">Hasnain Traders<br/>Uttar Pradesh, India</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-appleDark mb-1">General Inquiries</h3>
                    <a href="mailto:flipcart.coggen@gmail.com" className="text-appleDark/60 hover:text-accent transition-colors">flipcart.coggen@gmail.com</a>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-appleDark mb-1">Phone Support</h3>
                    <p className="text-appleDark/60">+91 9999999990 <br/><span className="text-sm">Mon-Fri, 9am - 6pm IST</span></p>
                  </div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
