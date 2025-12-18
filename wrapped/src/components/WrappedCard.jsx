// ============================================
// 🎓 WRAPPED CARD COMPONENT
// ============================================

import React from 'react'
import '../styles/WrappedCard.css'

function WrappedCard({ userName, rating, mood, moodEmoji, favoriteSong, favoriteArtist, favoriteShow }) {
  return (
    <div className="wrapped-card">
      {/* Header */}
      <div className="wrapped-header">
        <span className="wrapped-year">2025</span>
        <span className="wrapped-title">WRAPPED</span>
        <span className="wrapped-name">{userName}'s year</span>
      </div>

      {/* Stats Row */}
      <div className="wrapped-stats">
        {/* Rating */}
        <div className="stat-box">
          <span className="stat-emoji">⭐</span>
          <span className="stat-value">{rating}</span>
          <span className="stat-label">year rating</span>
        </div>

        {/* Mood */}
        <div className="stat-box">
          <span className="stat-emoji">{moodEmoji}</span>
          <span className="stat-value">{mood}</span>
          <span className="stat-label">year mood</span>
        </div>
      </div>

      {/* Favorite Song */}
      <div className="wrapped-section">
        <div className="section-icon">🎵</div>
        <div className="section-content">
          <span className="section-label">favorite song</span>
          <span className="section-value">{favoriteSong}</span>
          <span className="section-sub">{favoriteArtist}</span>
        </div>
      </div>

      {/* Favorite Show */}
      <div className="wrapped-section">
        <div className="section-icon">📺</div>
        <div className="section-content">
          <span className="section-label">favorite show</span>
          <span className="section-value">{favoriteShow}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="wrapped-footer">
        <span>✨ see you in 2026 ✨</span>
      </div>
    </div>
  )
}

export default WrappedCard
