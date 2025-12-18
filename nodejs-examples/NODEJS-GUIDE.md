# 🟢 Understanding Node.js

> JavaScript breaks free from the browser!

---

## 🤔 What is Node.js?

Node.js is a **JavaScript runtime** that lets you run JavaScript **outside** the browser - on servers, your computer, or anywhere!

```
BEFORE Node.js (2009):                 AFTER Node.js:

┌─────────────────────┐               ┌─────────────────────┐
│      Browser        │               │      Browser        │
│  ┌───────────────┐  │               │  ┌───────────────┐  │
│  │  JavaScript   │  │               │  │  JavaScript   │  │
│  │  lives here   │  │               │  │  (Frontend)   │  │
│  │  ONLY! 🔒     │  │               │  └───────────────┘  │
│  └───────────────┘  │               └─────────────────────┘
└─────────────────────┘                         +
                                      ┌─────────────────────┐
                                      │      Server         │
                                      │  ┌───────────────┐  │
                                      │  │  JavaScript   │  │
                                      │  │  (Backend)    │  │
                                      │  │  with Node.js │  │
                                      │  └───────────────┘  │
                                      └─────────────────────┘
                                                +
                                      ┌─────────────────────┐
                                      │  Your Computer      │
                                      │  Scripts, Tools,    │
                                      │  Automation...      │
                                      └─────────────────────┘
```

### In Simple Terms

- **JavaScript in Browser** = Can manipulate web pages, handle clicks, animations
- **JavaScript in Node.js** = Can read/write files, create servers, access databases, and MORE!

---

## 🎯 Why Was Node.js Created?

### The Problem (Before 2009)

If you wanted to build a full web application, you needed to know:

| Part | Language |
|------|----------|
| Frontend (Browser) | JavaScript |
| Backend (Server) | PHP, Python, Java, Ruby, etc. |

**Two different languages for one project!** 😫

### The Solution

**Ryan Dahl** created Node.js in 2009 with a simple idea:

> "What if we could use JavaScript everywhere?"

He took **V8** (Google Chrome's JavaScript engine) and made it work outside the browser!

### Benefits of Node.js

| Benefit | Explanation |
|---------|-------------|
| **One Language** | JavaScript for frontend AND backend |
| **Fast** | Built on Chrome's V8 engine |
| **Non-blocking** | Can handle many requests at once |
| **Huge Ecosystem** | npm has 2+ million packages! |
| **Great for Real-time** | Perfect for chat apps, live updates |

---

## 🚀 Getting Started

### Check if Node.js is Installed

Open your terminal and type:

```bash
node --version
# Should show something like: v18.17.0

npm --version
# Should show something like: 9.6.7
```

### Your First Node.js Program

Create a file called `hello.js`:

```javascript
// hello.js
console.log("Hello from Node.js! 🟢");

// You can use modern JavaScript
const greeting = "Welcome";
const name = "Developer";

console.log(`${greeting}, ${name}!`);

// Math works the same
const sum = 10 + 20;
console.log(`10 + 20 = ${sum}`);
```

Run it in terminal:

```bash
node hello.js
```

Output:
```
Hello from Node.js! 🟢
Welcome, Developer!
10 + 20 = 30
```

**That's it!** JavaScript running outside the browser! 🎉

---

## 📦 Chapter 1: npm (Node Package Manager)

### What is npm?

npm is like an **app store for code**. Need to send emails? There's a package. Need to work with dates? There's a package. Need ANYTHING? There's probably a package!

### Basic npm Commands

```bash
# Initialize a new project (creates package.json)
npm init

# Initialize with default values (skip questions)
npm init -y

# Install a package
npm install express

# Install a package as dev dependency
npm install --save-dev nodemon

# Install all dependencies from package.json
npm install

# Run a script defined in package.json
npm run start
npm run dev
```

### package.json Explained

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My awesome Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

| Field | Purpose |
|-------|---------|
| `name` | Project name |
| `version` | Current version |
| `scripts` | Commands you can run with `npm run` |
| `dependencies` | Packages needed for production |
| `devDependencies` | Packages needed only for development |

---

## 📁 Chapter 2: File System (fs)

### The Superpower: Reading and Writing Files!

In the browser, JavaScript **cannot** access files on your computer (security reasons!). But Node.js can!

### Reading Files

```javascript
// readFile.js
const fs = require('fs');

// Method 1: Asynchronous (non-blocking) - RECOMMENDED
fs.readFile('example.txt', 'utf8', (error, data) => {
    if (error) {
        console.log('Error reading file:', error);
        return;
    }
    console.log('File contents:', data);
});

console.log('This prints FIRST! (non-blocking)');


// Method 2: Synchronous (blocking)
const data = fs.readFileSync('example.txt', 'utf8');
console.log('File contents:', data);
```

### Writing Files

```javascript
// writeFile.js
const fs = require('fs');

const content = `
Hello, this is my file!
Created with Node.js
Date: ${new Date().toLocaleDateString()}
`;

// Write to file (creates if doesn't exist, overwrites if exists)
fs.writeFile('output.txt', content, (error) => {
    if (error) {
        console.log('Error writing file:', error);
        return;
    }
    console.log('File written successfully! ✅');
});

// Append to file (adds to end)
fs.appendFile('log.txt', `Log entry at ${new Date()}\n`, (error) => {
    if (error) {
        console.log('Error:', error);
        return;
    }
    console.log('Log entry added!');
});
```

### Practical Example: Simple Logger

```javascript
// logger.js
const fs = require('fs');

function log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    
    // Print to console
    console.log(logEntry);
    
    // Also save to file
    fs.appendFile('app.log', logEntry, (err) => {
        if (err) console.error('Failed to write log');
    });
}

// Usage
log('Application started');
log('User logged in');
log('Processing order #12345');
```

---

## 🌐 Chapter 3: Creating a Web Server

### The Built-in Way: http Module

```javascript
// server-basic.js
const http = require('http');

// Create a server
const server = http.createServer((request, response) => {
    // Log the request
    console.log(`${request.method} ${request.url}`);
    
    // Set response header
    response.writeHead(200, { 'Content-Type': 'text/html' });
    
    // Send response
    response.end(`
        <html>
            <head><title>My Node.js Server</title></head>
            <body>
                <h1>Hello from Node.js! 🟢</h1>
                <p>You requested: ${request.url}</p>
            </body>
        </html>
    `);
});

// Start listening on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

Run it:
```bash
node server-basic.js
```

Then open `http://localhost:3000` in your browser!

### Handling Different Routes

```javascript
// server-routes.js
const http = require('http');

const server = http.createServer((req, res) => {
    // Route handling
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home Page</h1>');
    } 
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1>');
    } 
    else if (req.url === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ]));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
```

**This works, but it gets messy fast!** That's why we use Express.js...

---

## ⚡ Chapter 4: Express.js (The Easy Way)

### What is Express.js?

Express is a **framework** that makes building web servers MUCH easier!

### Installation

```bash
npm install express
```

### Basic Express Server

```javascript
// server-express.js
const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express! ⚡</h1>');
});

// About route
app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>');
});

// API route - returns JSON
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'T-Shirt', price: 99 },
        { id: 2, name: 'Jeans', price: 199 },
        { id: 3, name: 'Shoes', price: 299 }
    ];
    res.json(products);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});
```

**So much cleaner!** 🎉

### Express with Dynamic Routes

```javascript
// server-dynamic.js
const express = require('express');
const app = express();

// Fake database
const products = [
    { id: 1, name: 'T-Shirt', price: 99, category: 'clothing' },
    { id: 2, name: 'Jeans', price: 199, category: 'clothing' },
    { id: 3, name: 'Sneakers', price: 299, category: 'shoes' },
    { id: 4, name: 'Watch', price: 499, category: 'accessories' }
];

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get single product by ID
// :id is a route parameter
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
});

// Get products by category
app.get('/api/category/:category', (req, res) => {
    const category = req.params.category;
    const filtered = products.filter(p => p.category === category);
    res.json(filtered);
});

// Search with query parameters
// Example: /api/search?q=shirt&maxPrice=100
app.get('/api/search', (req, res) => {
    let results = products;
    
    // Filter by search query
    if (req.query.q) {
        const query = req.query.q.toLowerCase();
        results = results.filter(p => 
            p.name.toLowerCase().includes(query)
        );
    }
    
    // Filter by max price
    if (req.query.maxPrice) {
        const maxPrice = parseInt(req.query.maxPrice);
        results = results.filter(p => p.price <= maxPrice);
    }
    
    res.json(results);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
```

### Testing the Routes

```bash
# Get all products
curl http://localhost:3000/api/products

# Get product with ID 2
curl http://localhost:3000/api/products/2

# Get products in category "clothing"
curl http://localhost:3000/api/category/clothing

# Search for "shirt" under 100 TL
curl "http://localhost:3000/api/search?q=shirt&maxPrice=100"
```

---

## 📨 Chapter 5: Handling POST Requests

### Receiving Data from Frontend

```javascript
// server-post.js
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
let todos = [
    { id: 1, text: 'Learn Node.js', done: false },
    { id: 2, text: 'Build an API', done: false }
];

// GET - Retrieve all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST - Create new todo
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    
    const newTodo = {
        id: Date.now(),
        text: text,
        done: false
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT - Update a todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { text, done } = req.body;
    
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (text !== undefined) todo.text = text;
    if (done !== undefined) todo.done = done;
    
    res.json(todo);
});

// DELETE - Remove a todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos.splice(index, 1);
    res.json({ message: 'Todo deleted' });
});

app.listen(3000, () => {
    console.log('Todo API running at http://localhost:3000');
});
```

### HTTP Methods Explained

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Retrieve data | Get all products |
| **POST** | Create new data | Add new product |
| **PUT** | Update existing data | Update product price |
| **DELETE** | Remove data | Delete a product |

```
CRUD Operations:
Create → POST
Read   → GET
Update → PUT
Delete → DELETE
```

---

## 🔄 Chapter 6: Async/Await in Node.js

### The Modern Way to Handle Async Code

```javascript
// async-example.js
const fs = require('fs').promises; // Use promises version

// Old way: Callbacks (callback hell 😱)
/*
fs.readFile('file1.txt', (err, data1) => {
    fs.readFile('file2.txt', (err, data2) => {
        fs.readFile('file3.txt', (err, data3) => {
            // Nested mess!
        });
    });
});
*/

// Modern way: Async/Await 😊
async function readAllFiles() {
    try {
        const data1 = await fs.readFile('file1.txt', 'utf8');
        const data2 = await fs.readFile('file2.txt', 'utf8');
        const data3 = await fs.readFile('file3.txt', 'utf8');
        
        console.log('File 1:', data1);
        console.log('File 2:', data2);
        console.log('File 3:', data3);
    } catch (error) {
        console.error('Error reading files:', error);
    }
}

readAllFiles();
```

### Async/Await with Express

```javascript
// server-async.js
const express = require('express');
const app = express();

// Simulate database call
function getProductsFromDB() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' }
            ]);
        }, 1000); // Simulates 1 second delay
    });
}

// Async route handler
app.get('/api/products', async (req, res) => {
    try {
        const products = await getProductsFromDB();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000);
```

---

## 🏗️ Chapter 7: Project Structure

### Simple Project

```
my-project/
├── package.json
├── index.js          # Entry point
└── README.md
```

### Medium Project

```
my-api/
├── package.json
├── index.js              # Entry point
├── routes/
│   ├── products.js       # Product routes
│   ├── users.js          # User routes
│   └── orders.js         # Order routes
├── data/
│   └── products.json     # Data file
└── README.md
```

### Larger Project

```
my-app/
├── package.json
├── src/
│   ├── index.js          # Entry point
│   ├── app.js            # Express app setup
│   ├── routes/
│   │   ├── index.js      # Route aggregator
│   │   ├── products.js
│   │   └── users.js
│   ├── controllers/
│   │   ├── productController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── utils/
│       └── helpers.js
├── config/
│   └── database.js
├── tests/
└── README.md
```

---

## 🔧 Chapter 8: Useful Tools

### nodemon - Auto Restart

Automatically restarts your server when you make changes!

```bash
# Install globally
npm install -g nodemon

# Or as dev dependency
npm install --save-dev nodemon

# Run with nodemon
nodemon index.js
```

Add to `package.json`:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

Now use: `npm run dev`

### dotenv - Environment Variables

Keep sensitive data (passwords, API keys) out of your code!

```bash
npm install dotenv
```

Create `.env` file:
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
API_KEY=your-secret-key
```

Use in code:
```javascript
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

console.log(`Starting on port ${port}`);
```

**Important:** Add `.env` to `.gitignore`!

### cors - Cross-Origin Requests

Allow your frontend to talk to your backend:

```bash
npm install cors
```

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Or configure specific origins
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

---

## 🎯 Complete Example: Mini API

```javascript
// mini-api.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// "Database"
let products = [
    { id: 1, name: 'Laptop', price: 15000, stock: 10 },
    { id: 2, name: 'Phone', price: 8000, stock: 25 },
    { id: 3, name: 'Headphones', price: 500, stock: 50 }
];

// Routes
// GET all products
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    res.json({ success: true, data: product });
});

// POST create product
app.post('/api/products', (req, res) => {
    const { name, price, stock } = req.body;
    
    // Validation
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            error: 'Name and price are required'
        });
    }
    
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        stock: stock || 0
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        success: true,
        data: newProduct
    });
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    const { name, price, stock } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock !== undefined) product.stock = stock;
    
    res.json({ success: true, data: product });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    products.splice(index, 1);
    
    res.json({
        success: true,
        message: 'Product deleted'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🟢 Server running at http://localhost:${PORT}`);
    console.log(`📦 API endpoints:`);
    console.log(`   GET    /api/products`);
    console.log(`   GET    /api/products/:id`);
    console.log(`   POST   /api/products`);
    console.log(`   PUT    /api/products/:id`);
    console.log(`   DELETE /api/products/:id`);
});
```

---

## 📊 Node.js vs Browser JavaScript

| Feature | Browser JS | Node.js |
|---------|-----------|---------|
| DOM Access | ✅ Yes | ❌ No |
| File System | ❌ No | ✅ Yes |
| Network Requests | ✅ fetch() | ✅ http, axios |
| Window/Document | ✅ Yes | ❌ No |
| process, fs, path | ❌ No | ✅ Yes |
| npm packages | Limited | ✅ Full access |
| Run Location | Browser | Server/Computer |

---

## 🎓 Key Takeaways

1. **Node.js** = JavaScript outside the browser
2. **npm** = Package manager (2+ million packages!)
3. **Express** = Framework for building web servers easily
4. **fs module** = Read/write files
5. **Async/await** = Modern way to handle async operations
6. **REST API** = GET, POST, PUT, DELETE

### The Big Picture

```
Frontend (React)                    Backend (Node.js)
      │                                    │
      │    HTTP Request (GET /api/data)    │
      │ ─────────────────────────────────> │
      │                                    │
      │                              ┌─────┴─────┐
      │                              │  Process  │
      │                              │  Request  │
      │                              └─────┬─────┘
      │                                    │
      │    HTTP Response (JSON data)       │
      │ <───────────────────────────────── │
      │                                    │
 ┌────┴────┐                               │
 │ Update  │                               │
 │   UI    │                               │
 └─────────┘                               │
```

---

## 🔗 Resources

- [Node.js Official Docs](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [npm Documentation](https://docs.npmjs.com/)
- [JavaScript.info - Node.js](https://javascript.info/)

---

## 🚀 What's Next?

After mastering the basics:

1. **Databases** - MongoDB, PostgreSQL
2. **Authentication** - JWT, sessions
3. **TypeScript** - Type safety for Node.js
4. **Testing** - Jest, Mocha
5. **Deployment** - Docker, AWS, Heroku
6. **WebSockets** - Real-time communication

---

*Node.js opened up a whole new world for JavaScript developers. Now you can build ANYTHING with just one language! 🎉*

