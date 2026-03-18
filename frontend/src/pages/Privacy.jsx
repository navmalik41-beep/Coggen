import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="bg-white py-24 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-appleGray pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-4">Privacy Policy</h1>
          <p className="text-appleDark/60 uppercase text-sm tracking-widest">Last Updated: March 2026</p>
        </motion.div>

        <div className="prose prose-lg text-appleDark/80 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">1. Introduction</h2>
            <p>At Coggen Nutrition ("we", "our", "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Identity Data:</strong> includes first name, last name, username.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes payment card details (processed securely via third-party gateways).</li>
              <li><strong>Transaction Data:</strong> includes details about payments and products you have purchased.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">3. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees and partners who have a business need to know.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
