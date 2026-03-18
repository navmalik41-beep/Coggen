import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save } from 'lucide-react';

export default function EditProductModal({ product, onClose, onSave, isLocked }) {
  const [formData, setFormData] = useState({ 
    ...product,
    ingredients: product.ingredients?.join(', ') || '',
    benefits: product.benefits?.join(', ') || ''
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleImageUpload = async (e) => {
    if (isLocked) return;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('image', file);
    
    try {
      // addToast('Uploading image...', 'success'); // This line was in the instruction but addToast is not defined. Assuming it's a placeholder or needs to be added elsewhere.
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.imageUrl }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      ingredients: typeof formData.ingredients === 'string' 
        ? formData.ingredients.split(',').map(s => s.trim()).filter(Boolean)
        : formData.ingredients,
      benefits: typeof formData.benefits === 'string'
        ? formData.benefits.split(',').map(s => s.trim()).filter(Boolean)
        : formData.benefits
    };
    onSave(payload);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-appleDark/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-appleGray">
            <h2 className="text-2xl font-bold text-appleDark">Edit Product Details</h2>
            <button type="button" onClick={onClose} className="p-2 hover:bg-appleGray rounded-full transition-colors text-appleDark/60 hover:text-appleDark">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Image Section */}
              <div className="md:col-span-1 space-y-4">
                <label className="block text-sm font-medium text-appleDark">Product Image</label>
                <div className="aspect-square bg-appleGray/30 rounded-2xl p-4 flex flex-col items-center justify-center relative border-2 border-dashed border-appleGray hover:border-accent transition-colors group overflow-hidden">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-contain absolute opacity-50 group-hover:opacity-10 transition-opacity" />
                  
                  {!isLocked ? (
                    <div className="z-10 text-center">
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-appleGray flex items-center gap-2 text-sm font-medium hover:bg-appleGray transition-colors cursor-pointer"
                      >
                         {uploading ? 'Uploading...' : <><Upload size={16} /> Change Image</>}
                      </button>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>
                  ) : (
                    <div className="z-10 text-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm font-medium text-red-500">
                      Uploads Locked
                    </div>
                  )}
                </div>
              </div>

              {/* Data Section */}
              <div className="md:col-span-2 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-appleDark mb-2">Product Name</label>
                     <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-appleDark mb-2">Category</label>
                     <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                   </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-appleDark mb-2">Short Description</label>
                  <input required type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Brief highlight sentence..." className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-appleDark mb-2">Full Description</label>
                  <textarea required rows="3" name="description" value={formData.description} onChange={handleChange} placeholder="Detailed product analysis and usage instructions..." className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all resize-none"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-appleDark mb-2">Price (₹)</label>
                     <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all" />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-appleDark mb-2">Ingredients (comma separated)</label>
                   <textarea rows="2" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Whey Isolate, Natural Flavors..." className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all resize-none"></textarea>
                </div>

                <div>
                   <label className="block text-sm font-medium text-appleDark mb-2">Benefits (comma separated)</label>
                   <textarea rows="2" name="benefits" value={formData.benefits} onChange={handleChange} placeholder="Builds muscle, Fast recovery..." className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border border-transparent focus:border-accent focus:bg-white outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-appleGray flex justify-end gap-4">
              <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-medium text-appleDark/70 hover:bg-appleGray transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-accent text-white px-8 py-3 rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-yellow-600 transition-all flex items-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
