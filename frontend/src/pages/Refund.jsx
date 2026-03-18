import { motion } from 'framer-motion';

export default function Refund() {
  return (
    <div className="bg-white py-24 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-appleGray pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-4">Refund Policy</h1>
          <p className="text-appleDark/60 uppercase text-sm tracking-widest">Effective Date: March 2026</p>
        </motion.div>

        <div className="prose prose-lg text-appleDark/80 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">7-Day Guarantee</h2>
            <p>At Coggen Nutrition, we stand behind the quality of our premium performance products. If you are not completely satisfied with your purchase, we offer a 7-day money-back guarantee on all unopened and unused products.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">Conditions for Return</h2>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Item must be in its original, unopened packaging.</li>
              <li>You must have a valid receipt or proof of purchase.</li>
              <li>Return request must be initiated within 7 days of delivery.</li>
              <li>Apparel and accessories must be unworn with original tags attached.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">How to Initiate a Refund</h2>
            <p>To start a return, please contact our support team at <a href="mailto:support@coggen.in" className="text-accent hover:underline">support@coggen.in</a> with your order number. Once approved, you will receive instructions on how to send your package back to us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-appleDark mb-4">Refund Processing</h2>
            <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 5-7 business days.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
