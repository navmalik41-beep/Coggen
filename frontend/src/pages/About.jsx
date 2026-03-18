import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-white py-24 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-bold text-appleDark mb-6">Engineered for Excellence.</h1>
          <p className="text-xl text-appleDark/60 leading-relaxed">
            Coggen Nutrition was built on a simple premise: athletic performance deserves better than compromise.
          </p>
        </motion.div>

        <div className="space-y-16">
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-appleDark mb-4">Our Mission</h2>
            <p className="text-lg text-appleDark/70 leading-relaxed mb-4">
              To provide professional athletes and everyday fitness enthusiasts with the highest quality, most scientifically advanced nutritional supplements possible. We believe in total transparency, clinically effective dosages, and flavors that make nutrition enjoyable.
            </p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-appleDark mb-4">The Science of Performance</h2>
            <p className="text-lg text-appleDark/70 leading-relaxed mb-4">
              Every formula at Coggen goes through rigorous R&D. We don't use proprietary blends. What's on the label is exactly what is inside the tub. Our products are manufactured in GMP-certified facilities to ensure purity and potency in every single batch.
            </p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-appleGray/50 p-10 rounded-3xl border border-appleGray relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mx-20 -my-20"></div>
               <h2 className="text-2xl font-bold text-appleDark mb-4 relative z-10">Premium Quality Promise</h2>
               <p className="text-lg text-appleDark/70 leading-relaxed relative z-10">
                 From the whey we source to the natural flavors we develop, premium is not just a marketing word—it's our standard operating procedure. When you choose Coggen, you are choosing guaranteed biological value and results you can see.
               </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
