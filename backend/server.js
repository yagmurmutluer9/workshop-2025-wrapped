// ============================================
// 🎓 WORKSHOP: Simple Backend Server
// ============================================

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// ===== DATA =====
// You can customize this!
const wrappedData = {
  user: {
    name: "Your Name"
  },
  rating: "7.5/10",
  mood: "chaotic",
  moodEmoji: "🤪",
  favoriteSong: "APT.",
  favoriteArtist: "ROSÉ & Bruno Mars",
  favoriteShow: "Severance",
  memeUrl: "https://i.pinimg.com/736x/88/67/7c/88677ccb31ee20e8e34e33bdabf7a310.jpg",
  memeCaption: "This was the vibe all year 💯"
}

// ===== ENDPOINT =====
app.get('/api/wrapped', (req, res) => {
  res.json(wrappedData)
})


// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`
  🎉 Backend running at http://localhost:${PORT}
  
  📡 Endpoint: GET /api/wrapped
  `)
})
