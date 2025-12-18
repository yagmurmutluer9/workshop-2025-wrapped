// ============================================
// 04 - Express.js Server (The Easy Way!)
// 
// First install Express:
//   npm init -y
//   npm install express
// 
// Then run: node 04-express-server.js
// Open: http://localhost:3000
// ============================================

const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static HTML for routes
app.use(express.static('public'));

console.log("🟢 Starting Express Server...\n");

// ===== FAKE DATABASE =====
let products = [
    { id: 1, name: "Classic T-Shirt", price: 79.99, category: "clothing", stock: 50 },
    { id: 2, name: "Denim Jeans", price: 199.99, category: "clothing", stock: 30 },
    { id: 3, name: "Running Shoes", price: 299.99, category: "shoes", stock: 25 },
    { id: 4, name: "Leather Wallet", price: 149.99, category: "accessories", stock: 100 },
    { id: 5, name: "Sport Watch", price: 499.99, category: "accessories", stock: 15 }
];

let nextId = 6;

// ===== ROUTES =====

// Home page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Express Server</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
                    min-height: 100vh;
                    padding: 40px 20px;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .card {
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    margin-bottom: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                }
                h1 { color: #333; margin-bottom: 10px; }
                h2 { color: #00b894; margin: 20px 0 10px; }
                .subtitle { color: #00b894; margin-bottom: 20px; }
                .endpoint {
                    background: #f8f9fa;
                    padding: 10px 15px;
                    border-radius: 8px;
                    margin: 8px 0;
                    font-family: monospace;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .method {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: bold;
                    color: white;
                }
                .get { background: #28a745; }
                .post { background: #007bff; }
                .put { background: #ffc107; color: #333; }
                .delete { background: #dc3545; }
                a { color: #00b894; }
                code { background: #eee; padding: 2px 6px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <h1>⚡ Express.js Server</h1>
                    <p class="subtitle">Much cleaner than vanilla Node.js!</p>
                    
                    <h2>📦 Product API Endpoints</h2>
                    
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <a href="/api/products">/api/products</a>
                        <span>- Get all products</span>
                    </div>
                    
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <a href="/api/products/1">/api/products/:id</a>
                        <span>- Get single product</span>
                    </div>
                    
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <a href="/api/products/category/clothing">/api/products/category/:cat</a>
                        <span>- Get by category</span>
                    </div>
                    
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <a href="/api/products/search?q=shirt&maxPrice=100">/api/products/search?q=&maxPrice=</a>
                        <span>- Search products</span>
                    </div>
                    
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <span>/api/products</span>
                        <span>- Create product</span>
                    </div>
                    
                    <div class="endpoint">
                        <span class="method put">PUT</span>
                        <span>/api/products/:id</span>
                        <span>- Update product</span>
                    </div>
                    
                    <div class="endpoint">
                        <span class="method delete">DELETE</span>
                        <span>/api/products/:id</span>
                        <span>- Delete product</span>
                    </div>
                    
                    <h2>🧪 Test with cURL</h2>
                    <p>Try these commands in your terminal:</p>
                    <pre style="background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 8px; overflow-x: auto; margin-top: 10px;">
# Get all products
curl http://localhost:3000/api/products

# Get product #1
curl http://localhost:3000/api/products/1

# Create new product
curl -X POST http://localhost:3000/api/products \\
  -H "Content-Type: application/json" \\
  -d '{"name":"New Product","price":99.99,"category":"clothing","stock":10}'

# Update product #1
curl -X PUT http://localhost:3000/api/products/1 \\
  -H "Content-Type: application/json" \\
  -d '{"price":89.99}'

# Delete product #5
curl -X DELETE http://localhost:3000/api/products/5
                    </pre>
                </div>
            </div>
        </body>
        </html>
    `);
});

// GET all products
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    res.json({ success: true, data: product });
});

// GET products by category
app.get('/api/products/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filtered = products.filter(p => p.category === category);
    
    res.json({
        success: true,
        category: category,
        count: filtered.length,
        data: filtered
    });
});

// SEARCH products with query parameters
app.get('/api/products/search', (req, res) => {
    let results = [...products];
    
    // Search by name
    if (req.query.q) {
        const query = req.query.q.toLowerCase();
        results = results.filter(p => 
            p.name.toLowerCase().includes(query)
        );
    }
    
    // Filter by max price
    if (req.query.maxPrice) {
        const maxPrice = parseFloat(req.query.maxPrice);
        results = results.filter(p => p.price <= maxPrice);
    }
    
    // Filter by min price
    if (req.query.minPrice) {
        const minPrice = parseFloat(req.query.minPrice);
        results = results.filter(p => p.price >= minPrice);
    }
    
    // Filter by category
    if (req.query.category) {
        results = results.filter(p => p.category === req.query.category);
    }
    
    res.json({
        success: true,
        count: results.length,
        filters: req.query,
        data: results
    });
});

// POST create new product
app.post('/api/products', (req, res) => {
    const { name, price, category, stock } = req.body;
    
    // Validation
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            error: 'Name and price are required'
        });
    }
    
    const newProduct = {
        id: nextId++,
        name,
        price: parseFloat(price),
        category: category || 'uncategorized',
        stock: parseInt(stock) || 0
    };
    
    products.push(newProduct);
    
    console.log(`✅ Created product: ${newProduct.name}`);
    
    res.status(201).json({
        success: true,
        message: 'Product created',
        data: newProduct
    });
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    const { name, price, category, stock } = req.body;
    
    if (name) product.name = name;
    if (price) product.price = parseFloat(price);
    if (category) product.category = category;
    if (stock !== undefined) product.stock = parseInt(stock);
    
    console.log(`✏️ Updated product #${id}`);
    
    res.json({
        success: true,
        message: 'Product updated',
        data: product
    });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    const deleted = products.splice(index, 1)[0];
    
    console.log(`🗑️ Deleted product: ${deleted.name}`);
    
    res.json({
        success: true,
        message: 'Product deleted',
        data: deleted
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route not found: ${req.method} ${req.url}`
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("=".repeat(50));
    console.log(`  ⚡ Express server running at http://localhost:${PORT}`);
    console.log("=".repeat(50));
    console.log("");
    console.log("Press Ctrl+C to stop the server");
});

