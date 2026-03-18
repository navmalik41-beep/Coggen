import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Package, Edit2, Trash2, Image as ImageIcon, Unlock, ShieldAlert, Plus, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import EditProductModal from '../components/EditProductModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import AddProductModal from '../components/AddProductModal';

export default function Admin() {
  const [locked, setLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Protein', 'Mass Gainer', 'Pre Workout', 'Amino', 'Health'];
  
  // Upgrade state
  const [uploadsLocked, setUploadsLocked] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const [directUploadId, setDirectUploadId] = useState(null);



  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      addToast('Failed to fetch products', 'error');
    }
  };

  const fetchLockStatus = async () => {
    try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/lock-status`);
       const data = await res.json();
       setUploadsLocked(data.locked);
    } catch (err) { }
  }

  useEffect(() => {
    if (!locked) {
      fetchProducts();
      fetchLockStatus();
    }
  }, [locked]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { 
      setLocked(false);
      setError('');
      addToast('Welcome to Admin Dashboard', 'success');
    } else {
      setError('Invalid password. Hint: admin123');
    }
  };

  const toggleUploadLock = async () => {
    try {
      const newState = !uploadsLocked;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/toggle-lock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locked: newState })
      });
      const data = await res.json();
      if (data.success) {
        setUploadsLocked(newState);
        addToast(newState ? 'Product uploads locked' : 'Product uploads unlocked', newState ? 'error' : 'success');
      }
    } catch (err) {
      addToast('Failed to toggle lock status', 'error');
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      console.log('Admin Form Add Product Response:', data);
      if (data.success) {
        setIsAddingProduct(false);
        fetchProducts(); // Refresh product list dynamically from backend
        addToast('Product created successfully', 'success');
      } else {
        addToast(data.error || 'Failed to create product', 'error');
      }
    } catch (err) {
      addToast('Network error while saving', 'error');
    }
  };

  const handleSaveEdit = async (updatedProduct) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      const data = await res.json();
      
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setEditingProduct(null);
        addToast('Product updated successfully', 'success');
      } else {
        addToast(data.error || 'Failed to update product', 'error');
      }
    } catch (err) {
      addToast('Network error while saving', 'error');
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (data.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
        setDeletingProduct(null);
        addToast('Product deleted successfully', 'success');
      } else {
        addToast(data.error || 'Failed to delete product', 'error');
      }
    } catch (err) {
      addToast('Network error while deleting', 'error');
    }
  };

  const handleDirectImageUpload = async (e) => {
    if (uploadsLocked) return addToast('Uploads are currently locked', 'error');
    
    const file = e.target.files?.[0];
    if (!file || !directUploadId) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('productId', directUploadId);
    
    addToast('Uploading image...', 'success');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      
      if (result.success) {
        setProducts(prev => prev.map(p => p.id === directUploadId ? { ...p, image: result.imageUrl } : p));
        addToast('Image uploaded successfully', 'success');
      } else {
         addToast(result.error || 'Upload failed', 'error');
      }
    } catch (err) {
      addToast('Network error during upload', 'error');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setDirectUploadId(null);
    }
  };

  if (locked) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl premium-shadow border border-appleGray w-full max-w-md text-center"
        >
          <div className="w-16 h-16 bg-appleGray rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={24} className="text-appleDark" />
          </div>
          <h2 className="text-2xl font-bold text-appleDark mb-6">Admin Panel</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-appleGray/50 border-none focus:ring-2 focus:ring-accent outline-none transition-shadow text-center"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-appleDark text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-colors">
              Unlock
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hidden Global Input for Direct Grid Upload */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleDirectImageUpload}
      />



      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-appleDark">Dashboard</h1>
          <p className="text-appleDark/60 mt-1">Manage your premium product catalog</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
             onClick={() => setIsAddingProduct(true)}
             className="px-5 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 bg-accent text-white hover:bg-yellow-600 shadow-sm hover:shadow-md"
          >
             <Plus size={18} /> Add Product
          </button>
          <div className="h-6 w-px bg-appleGray hidden md:block mx-1"></div>
          <button 
            onClick={toggleUploadLock} 
            className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium text-sm transition-colors border ${
              uploadsLocked 
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
            }`}
          >
            {uploadsLocked ? <Lock size={16} /> : <Unlock size={16} />}
            {uploadsLocked ? 'Uploads Locked' : 'Uploads Unlocked'}
          </button>
          <button onClick={() => { setLocked(true); setPassword(''); addToast('Logged out'); }} className="px-4 py-2 bg-appleGray text-appleDark rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm flex items-center gap-2">
            <ShieldAlert size={16} /> Lock System
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl premium-shadow border border-appleGray overflow-hidden">
        <div className="p-6 border-b border-appleGray flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-appleDark/60" />
            <h2 className="text-xl font-bold text-appleDark">Product Database (<span className="text-accent">Total: {products.length}</span>)</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 w-full sm:w-64 rounded-lg bg-appleGray/30 border border-appleGray focus:bg-white focus:border-accent outline-none transition-colors text-sm"
            />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 w-full sm:w-auto rounded-lg bg-appleGray/30 border border-appleGray focus:bg-white focus:border-accent outline-none transition-colors text-sm appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                 <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-appleGray/30 text-appleDark/60 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium pl-6">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products
                  .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
                  .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(product => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    key={product.id} 
                    className="border-b border-appleGray/50 hover:bg-appleGray/20 transition-colors group"
                  >
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-appleGray/30 rounded-lg p-1 flex-shrink-0 relative border border-appleGray">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-appleDark">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-appleDark/60">
                      <span className="px-3 py-1 bg-appleGray/50 rounded-full font-medium">{product.category}</span>
                    </td>
                    <td className="p-4 font-bold text-appleDark">₹{product.price}</td>
                    <td className="p-4 text-xs font-mono text-appleDark/40">#{product.id}</td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            if(uploadsLocked) { addToast('Uploads locked. Unlock to change images.', 'error'); return; }
                            setDirectUploadId(product.id);
                            fileInputRef.current?.click();
                          }}
                          className={`p-2 rounded-lg transition-colors ${uploadsLocked ? 'text-gray-300 cursor-not-allowed' : 'text-accent hover:bg-accent/10'}`}
                          title="Change Image"
                        >
                          <ImageIcon size={18} />
                        </button>
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-appleDark hover:bg-appleGray rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => setDeletingProduct(product)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {products.length === 0 && (
                <tr>
                   <td colSpan="5" className="p-8 text-center text-appleDark/50 font-medium">No products found in the database. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddingProduct && (
        <AddProductModal 
          isLocked={uploadsLocked}
          onClose={() => setIsAddingProduct(false)}
          onAdd={handleAddProduct}
        />
      )}

      {editingProduct && (
        <EditProductModal 
          product={editingProduct}
          isLocked={uploadsLocked}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmModal 
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
