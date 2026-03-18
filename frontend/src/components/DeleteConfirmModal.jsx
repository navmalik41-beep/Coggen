import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ product, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-appleDark/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center"
        >
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={30} className="text-red-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-appleDark mb-2">Delete Product?</h2>
          <p className="text-appleDark/60 mb-8">
            Are you sure you want to delete <span className="font-bold text-appleDark">{product.name}</span>? This action cannot be undone.
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => onConfirm(product.id)}
              className="w-full bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-sm"
            >
              Yes, Delete Product
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-appleGray text-appleDark px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
