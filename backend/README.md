# 🔧 Backend API - Setup Guide

Simple Express.js backend serving your 2025 Wrapped data.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm run start
```

Server runs on: **http://localhost:3001**

---

## 📋 Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
└── README.md          # This file
```

---

## 🛠 Setup from Scratch

### Step 1: Initialize Project

```bash
# Create backend folder
mkdir backend
cd backend

# Initialize npm project
npm init -y
```

### Step 2: Install Dependencies

```bash
# Install Express and CORS
npm install express cors
```

### Step 3: Create server.js

Create a `server.js` file with:

```javascript
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const wrappedData = {
  user: { name: "Your Name" },
  rating: "7.5/10",
  mood: "chaotic",
  moodEmoji: "🤪",
  favoriteSong: "APT.",
  favoriteArtist: "ROSÉ & Bruno Mars",
  favoriteShow: "Severance",
  memeUrl: "https://i.pinimg.com/736x/88/67/7c/88677ccb31ee20e8e34e33bdabf7a310.jpg",
  memeCaption: "This was the vibe all year 💯"
}

app.get('/api/wrapped', (req, res) => {
  res.json(wrappedData)
})

app.listen(PORT, () => {
  console.log(`🎉 Backend running at http://localhost:${PORT}`)
})
```

### Step 4: Update package.json

Add start script:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

---

## 📡 API Endpoint

### GET /api/wrapped

Returns your wrapped data as JSON.

**URL:** `http://localhost:3001/api/wrapped`

**Response:**
```json
{
  "user": {
    "name": "Your Name"
  },
  "rating": "7.5/10",
  "mood": "chaotic",
  "moodEmoji": "🤪",
  "favoriteSong": "APT.",
  "favoriteArtist": "ROSÉ & Bruno Mars",
  "favoriteShow": "Severance",
  "memeUrl": "https://...",
  "memeCaption": "This was the vibe all year 💯"
}
```

---

## 🎨 Customization

Edit the `wrappedData` object in `server.js`:

```javascript
const wrappedData = {
  user: {
    name: "Jane Doe"           // ← Your name
  },
  rating: "9/10",              // ← Rate your year
  mood: "grateful",            // ← Describe your mood
  moodEmoji: "🙏",             // ← Pick an emoji
  favoriteSong: "Your Song",   // ← Your favorite song
  favoriteArtist: "Artist",    // ← Artist name
  favoriteShow: "Show Name",   // ← Favorite show
  memeUrl: "https://...",      // ← Your meme URL
  memeCaption: "Your caption"  // ← Meme caption
}
```

**Important:** Restart the server after making changes!

```bash
# Stop the server (Ctrl + C)
# Start it again
npm run start
```

---

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run start` | Start the server |

---

## 🐛 Troubleshooting

### Port 3001 already in use

```bash
# Kill the process (Mac/Linux)
lsof -ti:3001 | xargs kill -9

# Or change the port in server.js
const PORT = 3002  // Use different port
```

### Cannot find module 'express'

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Frontend can't connect

Make sure:
1. Backend is running (`npm run start`)
2. You see: "Backend running at http://localhost:3001"
3. CORS is enabled (already included in code)
4. Frontend is using the correct URL

---

## 📦 Dependencies

- **express** (^4.18.2) - Web framework
- **cors** (^2.8.5) - Enable cross-origin requests

---

## 🔍 Testing the API

### Using Browser

Open: http://localhost:3001/api/wrapped

You should see your JSON data.

### Using curl

```bash
curl http://localhost:3001/api/wrapped
```

### Using Postman or Insomnia

- Method: GET
- URL: http://localhost:3001/api/wrapped

---

## 📚 What This Does

1. **Express Server** - Creates a web server
2. **CORS Middleware** - Allows frontend to access API
3. **JSON Endpoint** - Serves data at `/api/wrapped`
4. **Static Data** - Returns the same data for every request

---

## 🎯 Next Steps

- Add more endpoints for different data
- Connect to a real database
- Add authentication
- Deploy to production (Heroku, Railway, Render)

---

## 💡 Tips

- Keep the server running while developing
- Use `Ctrl + C` to stop the server
- Check terminal for error messages
- Always restart after code changes

---

Happy coding! 🎉

