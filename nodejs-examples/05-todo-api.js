// ============================================
// 05 - Todo API (Complete REST API)
// 
// Install: npm install express cors
// Run: node 05-todo-api.js
// Open: http://localhost:3000
// ============================================

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("🟢 Starting Todo API...\n");

// ===== IN-MEMORY DATABASE =====
let todos = [
    { id: 1, text: "Learn Node.js", done: true, createdAt: new Date().toISOString() },
    { id: 2, text: "Build a REST API", done: true, createdAt: new Date().toISOString() },
    { id: 3, text: "Connect to React frontend", done: false, createdAt: new Date().toISOString() },
    { id: 4, text: "Deploy to production", done: false, createdAt: new Date().toISOString() }
];
let nextId = 5;

// ===== ROUTES =====

// Serve frontend
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Todo API</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    padding: 40px 20px;
                }
                .container { max-width: 600px; margin: 0 auto; }
                .card {
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    margin-bottom: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                }
                h1 { margin-bottom: 10px; }
                .subtitle { color: #667eea; margin-bottom: 20px; }
                .input-group {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                input[type="text"] {
                    flex: 1;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 16px;
                }
                button {
                    padding: 12px 24px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                }
                button:hover { background: #5a6fd6; }
                .todo-list { list-style: none; }
                .todo-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                }
                .todo-item input[type="checkbox"] {
                    width: 20px;
                    height: 20px;
                }
                .todo-item span { flex: 1; }
                .todo-item span.done {
                    text-decoration: line-through;
                    color: #999;
                }
                .delete-btn {
                    background: #e74c3c;
                    padding: 8px 16px;
                }
                .delete-btn:hover { background: #c0392b; }
                .stats {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    text-align: center;
                    margin-top: 20px;
                }
                .loading { text-align: center; padding: 20px; color: #999; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <h1>📝 Todo App</h1>
                    <p class="subtitle">Powered by Node.js + Express API</p>
                    
                    <div class="input-group">
                        <input type="text" id="todoInput" placeholder="What needs to be done?">
                        <button onclick="addTodo()">Add</button>
                    </div>
                    
                    <ul class="todo-list" id="todoList">
                        <li class="loading">Loading...</li>
                    </ul>
                    
                    <div class="stats" id="stats"></div>
                </div>
            </div>
            
            <script>
                const API_URL = 'http://localhost:3000/api/todos';
                
                // Fetch and display todos
                async function fetchTodos() {
                    const response = await fetch(API_URL);
                    const data = await response.json();
                    renderTodos(data.data);
                    updateStats(data.data);
                }
                
                // Render todos to DOM
                function renderTodos(todos) {
                    const list = document.getElementById('todoList');
                    
                    if (todos.length === 0) {
                        list.innerHTML = '<li class="loading">No todos yet. Add one above!</li>';
                        return;
                    }
                    
                    list.innerHTML = todos.map(todo => \`
                        <li class="todo-item">
                            <input 
                                type="checkbox" 
                                \${todo.done ? 'checked' : ''}
                                onchange="toggleTodo(\${todo.id})"
                            >
                            <span class="\${todo.done ? 'done' : ''}">\${todo.text}</span>
                            <button class="delete-btn" onclick="deleteTodo(\${todo.id})">Delete</button>
                        </li>
                    \`).join('');
                }
                
                // Update stats
                function updateStats(todos) {
                    const total = todos.length;
                    const completed = todos.filter(t => t.done).length;
                    const remaining = total - completed;
                    
                    document.getElementById('stats').innerHTML = 
                        \`Total: \${total} | Completed: \${completed} | Remaining: \${remaining}\`;
                }
                
                // Add new todo
                async function addTodo() {
                    const input = document.getElementById('todoInput');
                    const text = input.value.trim();
                    
                    if (!text) return alert('Please enter a todo!');
                    
                    await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text })
                    });
                    
                    input.value = '';
                    fetchTodos();
                }
                
                // Toggle todo done status
                async function toggleTodo(id) {
                    await fetch(\`\${API_URL}/\${id}/toggle\`, {
                        method: 'PUT'
                    });
                    fetchTodos();
                }
                
                // Delete todo
                async function deleteTodo(id) {
                    await fetch(\`\${API_URL}/\${id}\`, {
                        method: 'DELETE'
                    });
                    fetchTodos();
                }
                
                // Handle Enter key
                document.getElementById('todoInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') addTodo();
                });
                
                // Initial load
                fetchTodos();
            </script>
        </body>
        </html>
    `);
});

// GET all todos
app.get('/api/todos', (req, res) => {
    res.json({
        success: true,
        count: todos.length,
        data: todos
    });
});

// GET single todo
app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({
            success: false,
            error: 'Todo not found'
        });
    }
    
    res.json({ success: true, data: todo });
});

// POST create todo
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Text is required'
        });
    }
    
    const newTodo = {
        id: nextId++,
        text: text.trim(),
        done: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    
    console.log(`✅ Created: "${newTodo.text}"`);
    
    res.status(201).json({
        success: true,
        data: newTodo
    });
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({
            success: false,
            error: 'Todo not found'
        });
    }
    
    const { text, done } = req.body;
    
    if (text !== undefined) todo.text = text.trim();
    if (done !== undefined) todo.done = done;
    
    console.log(`✏️ Updated: "${todo.text}"`);
    
    res.json({ success: true, data: todo });
});

// PUT toggle todo done status
app.put('/api/todos/:id/toggle', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({
            success: false,
            error: 'Todo not found'
        });
    }
    
    todo.done = !todo.done;
    
    console.log(`🔄 Toggled: "${todo.text}" -> ${todo.done ? 'done' : 'not done'}`);
    
    res.json({ success: true, data: todo });
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Todo not found'
        });
    }
    
    const deleted = todos.splice(index, 1)[0];
    
    console.log(`🗑️ Deleted: "${deleted.text}"`);
    
    res.json({
        success: true,
        data: deleted
    });
});

// DELETE all completed todos
app.delete('/api/todos/completed/clear', (req, res) => {
    const before = todos.length;
    todos = todos.filter(t => !t.done);
    const deleted = before - todos.length;
    
    console.log(`🧹 Cleared ${deleted} completed todos`);
    
    res.json({
        success: true,
        message: `Cleared ${deleted} completed todos`
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log("=".repeat(50));
    console.log(`  📝 Todo API running at http://localhost:${PORT}`);
    console.log("=".repeat(50));
    console.log("");
    console.log("API Endpoints:");
    console.log("  GET    /api/todos              - Get all todos");
    console.log("  GET    /api/todos/:id          - Get single todo");
    console.log("  POST   /api/todos              - Create todo");
    console.log("  PUT    /api/todos/:id          - Update todo");
    console.log("  PUT    /api/todos/:id/toggle   - Toggle done status");
    console.log("  DELETE /api/todos/:id          - Delete todo");
    console.log("");
    console.log("Press Ctrl+C to stop the server");
    console.log("-".repeat(50));
});

