// ============================================
// 03 - Basic HTTP Server (No Express)
// Run with: node 03-basic-server.js
// Then open: http://localhost:3000
// ============================================

const http = require('http');

console.log("🟢 Starting Basic HTTP Server...\n");

// Create the server
const server = http.createServer((request, response) => {
    // Log every request
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${request.method} ${request.url}`);

    // Route handling
    if (request.url === '/' && request.method === 'GET') {
        // Home page
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node.js Server</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        max-width: 800px;
                        margin: 50px auto;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                    }
                    .card {
                        background: white;
                        border-radius: 16px;
                        padding: 40px;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    }
                    h1 { color: #333; }
                    .success { color: #28a745; }
                    a {
                        display: inline-block;
                        margin: 10px 10px 10px 0;
                        padding: 10px 20px;
                        background: #667eea;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                    }
                    a:hover { background: #5a6fd6; }
                    code {
                        background: #f4f4f4;
                        padding: 2px 8px;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>🟢 Node.js Server is Running!</h1>
                    <p class="success">✅ Congratulations! You've created your first Node.js server!</p>
                    
                    <h3>Try these routes:</h3>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/api/products">API: Products</a>
                    <a href="/api/time">API: Current Time</a>
                    
                    <h3>What's happening:</h3>
                    <ul>
                        <li>Node.js is listening on port <code>3000</code></li>
                        <li>When you visit a URL, Node.js receives the request</li>
                        <li>It checks the URL and sends back the appropriate response</li>
                        <li>Check your terminal to see the request logs!</li>
                    </ul>
                </div>
            </body>
            </html>
        `);
    }
    else if (request.url === '/about' && request.method === 'GET') {
        // About page
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>About - Node.js Server</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        max-width: 800px;
                        margin: 50px auto;
                        padding: 20px;
                        background: #f5f5f5;
                    }
                    .card {
                        background: white;
                        border-radius: 16px;
                        padding: 40px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    a { color: #667eea; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>📖 About This Server</h1>
                    <p>This is a basic HTTP server built with Node.js's built-in <code>http</code> module.</p>
                    <p>No external frameworks (like Express) are used!</p>
                    
                    <h3>Node.js Info:</h3>
                    <ul>
                        <li>Version: ${process.version}</li>
                        <li>Platform: ${process.platform}</li>
                        <li>Memory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB</li>
                    </ul>
                    
                    <p><a href="/">← Back to Home</a></p>
                </div>
            </body>
            </html>
        `);
    }
    else if (request.url === '/api/products' && request.method === 'GET') {
        // API endpoint - returns JSON
        const products = [
            { id: 1, name: "T-Shirt", price: 99.99, inStock: true },
            { id: 2, name: "Jeans", price: 199.99, inStock: true },
            { id: 3, name: "Sneakers", price: 299.99, inStock: false },
            { id: 4, name: "Watch", price: 499.99, inStock: true }
        ];
        
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(products, null, 2));
    }
    else if (request.url === '/api/time' && request.method === 'GET') {
        // API endpoint - current time
        const now = new Date();
        const timeData = {
            timestamp: now.toISOString(),
            date: now.toLocaleDateString('tr-TR'),
            time: now.toLocaleTimeString('tr-TR'),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(timeData, null, 2));
    }
    else {
        // 404 - Not Found
        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>404 - Not Found</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        text-align: center;
                        padding: 50px;
                        background: #f5f5f5;
                    }
                    h1 { font-size: 72px; color: #e74c3c; margin: 0; }
                    a { color: #667eea; }
                </style>
            </head>
            <body>
                <h1>404</h1>
                <p>Page not found: ${request.url}</p>
                <p><a href="/">← Go back home</a></p>
            </body>
            </html>
        `);
    }
});

// Start listening
const PORT = 3000;
server.listen(PORT, () => {
    console.log("=".repeat(50));
    console.log(`  🚀 Server running at http://localhost:${PORT}`);
    console.log("=".repeat(50));
    console.log("");
    console.log("Available routes:");
    console.log("  GET /           - Home page");
    console.log("  GET /about      - About page");
    console.log("  GET /api/products - Products JSON");
    console.log("  GET /api/time   - Current time JSON");
    console.log("");
    console.log("Press Ctrl+C to stop the server");
    console.log("-".repeat(50));
    console.log("Request log:");
});

