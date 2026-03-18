import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="bg-white py-24 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-appleGray pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-4">Terms & Conditions</h1>
          <p className="text-appleDark/60 uppercase text-sm tracking-widest">Effective Date: March 2026</p>
        </motion.div>

        <div className="prose prose-lg text-appleDark/80 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">1. Agreement to Terms</h2>
            <p>By accessing our website and purchasing our products, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">2. Products & Services</h2>
            <p>All products are subject to availability. We reserve the right to discontinue any product at any time. We also reserve the right to limit the sales of our products to any person, geographic region, or jurisdiction.</p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-appleDark mb-4">3. Medical Disclaimer</h2>
             <p className="p-4 bg-appleGray/50 rounded-xl border border-appleGray text-sm">
               The products and statements on this website have not been evaluated by the FDA or equivalent regional boards. Our products are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a healthcare professional before starting any diet, exercise program, or dietary supplements.
             </p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-appleDark mb-4">4. Pricing & Payments</h2>
             <p>All prices are subject to change without notice. We are not liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.</p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-appleDark mb-4">5. Contact Information</h2>
             <p>Questions about the Terms of Service should be sent to us at support@coggen.in.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
