const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const productsFilePath = path.join(__dirname, 'data', 'products.json');

const multer = require('multer');

// Configure multer for image uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const productsFile = path.join(__dirname, 'data', 'products.json');
const ordersFile = path.join(__dirname, 'data', 'orders.json');

// Ensure data directory and files exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, JSON.stringify([], null, 2));
}

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Global Lock State for Admin
let LOCK_PRODUCT_UPLOADS = false;

// Helper to interact with products file
const getProducts = () => JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
const saveProducts = (data) => fs.writeFileSync(productsFile, JSON.stringify(data, null, 2));
const getOrders = () => JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
const saveOrders = (data) => fs.writeFileSync(ordersFile, JSON.stringify(data, null, 2));

// GET Lock Status
app.get('/admin/lock-status', (req, res) => {
    res.json({ locked: LOCK_PRODUCT_UPLOADS });
});

// POST Toggle Lock Status
app.post('/admin/toggle-lock', (req, res) => {
    const { locked } = req.body;
    LOCK_PRODUCT_UPLOADS = !!locked;
    res.json({ success: true, locked: LOCK_PRODUCT_UPLOADS });
});

// GET existing products
app.get('/products', (req, res) => {
  try {
    const products = getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// GET Single Product
app.get('/products/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST Add Product
app.post('/admin/products', (req, res) => {
    try {
        if (LOCK_PRODUCT_UPLOADS) {
            return res.status(403).json({ error: 'Product uploads are currently locked by the administrator.' });
        }
        
        console.log('Incoming product payload to add:', req.body);
        let products = getProducts();
        
        const newProduct = req.body;
        // Generate new ID correctly avoiding collisions
        const highestId = products.reduce((max, p) => {
            const idNum = parseInt(p.id);
            return !isNaN(idNum) ? Math.max(max, idNum) : max;
        }, 0);
        newProduct.id = (highestId + 1).toString();
        
        products.push(newProduct);
        saveProducts(products);
        
        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to add product' });
    }
});

// PUT Edit Product
app.put('/admin/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        let products = getProducts();
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        products[index] = { ...products[index], ...updates };
        saveProducts(products);
        
        res.json({ success: true, product: products[index] });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE Product
app.delete('/admin/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        let products = getProducts();
        
        const initialLength = products.length;
        products = products.filter(p => p.id !== id);
        
        if (products.length === initialLength) {
             return res.status(404).json({ error: 'Product not found' });
        }
        
        saveProducts(products);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// POST Upload Image
app.post('/admin/upload', upload.single('image'), (req, res) => {
    try {
        if (LOCK_PRODUCT_UPLOADS) {
            // cleanup the strictly uploaded file if locked
            if(req.file) fs.unlinkSync(req.file.path);
            return res.status(403).json({ error: 'Product uploads are currently locked.' });
        }
        
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const { productId } = req.body;
        const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
        
        if (productId) {
            // Update product directly if ID provided
            let products = getProducts();
            const index = products.findIndex(p => p.id === productId);
            if(index !== -1) {
                products[index].image = imageUrl;
                saveProducts(products);
            }
        }
        
        res.json({ success: true, imageUrl });
    } catch (error) {
         console.error('Error uploading image:', error);
         res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Checkout Endpoint
app.post('/checkout', (req, res) => {
    try {
        console.log('Incoming checkout payload:', req.body);
        const { customerInfo, cartItems, totalAmount } = req.body;
        
        if (!customerInfo || !cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Invalid order data.' });
        }

        const newOrder = {
            id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            customerInfo,
            items: cartItems,
            totalAmount,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };

        const orders = getOrders();
        orders.push(newOrder);
        saveOrders(orders);

        res.status(201).json({ success: true, orderId: newOrder.id, message: 'Order created successfully.' });
    } catch (err) {
        console.error('Error processing checkout:', err);
        res.status(500).json({ error: 'Failed to process order.' });
    }
});

app.listen(PORT, () => console.log(`Backend fully stacked and listening on port ${PORT}`));
