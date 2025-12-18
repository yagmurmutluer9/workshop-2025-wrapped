# 🟢 Node.js Workshop Examples

Learn Node.js step by step with these practical examples!

---

## 📁 Files

| File | Description | Command |
|------|-------------|---------|
| `NODEJS-GUIDE.md` | Comprehensive Node.js guide | Read in VS Code |
| `01-hello-world.js` | Basic Node.js, no dependencies | `npm run hello` |
| `02-file-system.js` | Reading/writing files | `npm run files` |
| `03-basic-server.js` | HTTP server (no Express) | `npm run basic-server` |
| `04-express-server.js` | Express.js REST API | `npm run express` |
| `05-todo-api.js` | Complete Todo API with frontend | `npm run todo-api` |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd nodejs-examples
npm install
```

### 2. Run Examples

```bash
# Hello World (no server needed)
npm run hello

# File System example
npm run files

# Basic HTTP server
npm run basic-server
# Then open: http://localhost:3000

# Express.js server
npm run express
# Then open: http://localhost:3000

# Todo API (complete app!)
npm run todo-api
# Then open: http://localhost:3000
```

---

## 📖 Learning Path

### Step 1: Basics
1. Read `NODEJS-GUIDE.md` for concepts
2. Run `01-hello-world.js` - See Node.js execute JavaScript

### Step 2: File System
3. Run `02-file-system.js` - See how Node.js can read/write files
4. Check the `output/` folder for created files

### Step 3: HTTP Servers
5. Run `03-basic-server.js` - See a raw HTTP server
6. Notice how verbose the code is!

### Step 4: Express.js
7. Run `04-express-server.js` - Same functionality, cleaner code!
8. Try all the API endpoints

### Step 5: Complete App
9. Run `05-todo-api.js` - Full CRUD API with frontend
10. Add, toggle, and delete todos

---

## 🧪 Testing API Endpoints

Use these cURL commands in your terminal:

```bash
# Get all products
curl http://localhost:3000/api/products

# Get single product
curl http://localhost:3000/api/products/1

# Create new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99}'

# Update product
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":79.99}'

# Delete product
curl -X DELETE http://localhost:3000/api/products/1
```

---

## 💡 Tips

- **Ctrl+C** stops any running server
- Use **nodemon** for auto-restart during development:
  ```bash
  npm install -g nodemon
  nodemon 04-express-server.js
  ```
- Use **Postman** or **Thunder Client** (VS Code extension) for testing APIs
- Check terminal logs to see requests being processed

---

## 🔗 Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [npm Documentation](https://docs.npmjs.com/)

---

Happy coding! 🎉

