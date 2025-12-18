// ============================================
// 🎓 WORKSHOP: Main App Component
// ============================================

import React, { useState, useEffect } from 'react'
import './index.css'

// Import components
import LoadingScreen from './components/LoadingScreen'
import ErrorScreen from './components/ErrorScreen'
import WrappedCard from './components/WrappedCard'

function App() {
  // State
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:3001/api/wrapped')
      if (!response.ok) throw new Error('Failed to fetch data')
      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // Fetch on mount
  useEffect(() => {
    fetchData()
  }, [])

  // Conditional rendering
  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={fetchData} />
  }

  // Main render - use data from backend!
  return (
    <div className="app">
      <div className="app-container">
        <WrappedCard 
          userName={data.user.name}
          rating={data.rating}
          mood={data.mood}
          moodEmoji={data.moodEmoji}
          favoriteSong={data.favoriteSong}
          favoriteArtist={data.favoriteArtist}
          favoriteShow={data.favoriteShow}
        />
        
        {/* Meme of the Year */}
        <div className="meme-panel">
          <div className="meme-header">
            <h2>😂 Meme of the Year</h2>
          </div>
          
          <div className="meme-container">
            <img 
              src={data.memeUrl || "https://i.pinimg.com/736x/88/67/7c/88677ccb31ee20e8e34e33bdabf7a310.jpg"} 
              alt="Meme of the Year"
              className="meme-image"
            />
          </div>
          
          <div className="meme-caption">
            <p>{data.memeCaption || "This was the vibe all year 💯"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
