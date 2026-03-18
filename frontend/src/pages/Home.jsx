import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Award, TrendingUp, CheckCircle, Star } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.slice(0, 4)))
      .catch(err => console.error('Error fetching featured products:', err));
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-appleGray to-white -z-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center z-10 max-w-4xl mx-auto mt-16"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20 tracking-wide uppercase">
            India's Most Trusted Nutrition Brand
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-appleDark mb-6 leading-tight">
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600">
              Perfect Physique
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-appleDark/60 max-w-2xl mx-auto mb-10 font-light">
            Premium, lab-tested sports nutrition crafted for professional athletes and uncompromising lifters.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-appleDark text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-xl shadow-appleDark/20"
            >
              Explore Products <ChevronRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Featured Products */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-appleDark mb-4">Featured Excellence</h2>
              <p className="text-lg text-appleDark/60">Our highest rated premium supplements.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-1 text-accent font-medium hover:underline">
              View All <ChevronRight size={18} />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map(product => (
              <motion.div key={product.id} variants={fadeIn} className="group cursor-pointer h-full">
                <Link to={`/product/${product.id}`} className="block premium-shadow bg-white p-6 h-full flex flex-col border border-appleGray">
                  <div className="relative aspect-square mb-6 bg-appleGray rounded-2xl overflow-hidden flex items-center justify-center p-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{product.category}</span>
                    <h3 className="text-xl font-bold text-appleDark mb-2 leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-appleDark/60 mb-4 line-clamp-2">{product.shortDescription}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-appleDark">₹{product.price}</span>
                      <div className="w-10 h-10 rounded-full bg-appleGray flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                         <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Why Choose Coggen */}
      <section className="py-24 px-4 bg-appleGray">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-appleDark mb-6">The Premium Standard</h2>
            <p className="text-xl text-appleDark/60 max-w-3xl mx-auto">We don't compromise on quality. Every product is engineered for maximum biological value and performance.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Uncompromising Purity", desc: "Sourced from the finest global ingredients. Zero banned substances, zero fillers." },
              { icon: TrendingUp, title: "Maximum Efficacy", desc: "Formulated using clinically proven dosages to guarantee actual results, not just promises." },
              { icon: Award, title: "Award Winning Taste", desc: "Gourmet flavor profiles that make hitting your macros the best part of your day." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i*0.2, duration: 0.6 } } }}
                className="bg-white p-8 rounded-3xl premium-shadow border border-appleGray text-center"
              >
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-appleDark mb-4">{feature.title}</h3>
                <p className="text-appleDark/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Certifications */}
      <section className="py-20 bg-white border-y border-appleGray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 text-appleDark/40 grayscale hover:grayscale-0 transition-all duration-300">
            <CheckCircle size={40} className="text-accent" />
            <span className="text-2xl font-bold tracking-widest uppercase">GMP Certified</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center gap-3 text-appleDark/40 grayscale hover:grayscale-0 transition-all duration-300">
             <ShieldCheck size={40} className="text-accent" />
             <span className="text-2xl font-bold tracking-widest uppercase">ISO 9001:2015</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex items-center gap-3 text-appleDark/40 grayscale hover:grayscale-0 transition-all duration-300">
             <Award size={40} className="text-accent" />
             <span className="text-2xl font-bold tracking-widest uppercase">Lab Tested</span>
          </motion.div>
        </div>
      </section>

      {/* 5. Customer Trust */}
      <section className="py-24 px-4 bg-white">
         <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-appleDark mb-6">Trusted by Champions</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { name: "Rahul Sharma", role: "Professional Athlete", quote: "The whey gold quality is unmatched. Digestion is smooth and recovery is faster than ever." },
                 { name: "Priya Singh", role: "Fitness Coach", quote: "I recommend Coggen Nutrition to all my premium clients. Transparent labels and incredible results." },
                 { name: "Amit Patel", role: "Powerlifter", quote: "The pre-workout is insane. Clean energy, no crash, and the taste is surprisingly gourmet." }
               ].map((review, i) => (
                 <motion.div 
                   key={i}
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true }}
                   variants={fadeIn}
                   className="p-8 rounded-3xl bg-appleGray/50 border border-appleGray relative"
                 >
                    <div className="flex gap-1 mb-6 text-accent">
                      {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-lg text-appleDark italic mb-8">"{review.quote}"</p>
                    <div>
                      <h4 className="font-bold text-appleDark">{review.name}</h4>
                      <p className="text-sm text-appleDark/50">{review.role}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
