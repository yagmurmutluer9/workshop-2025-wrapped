// ============================================
// 🎓 ERROR SCREEN COMPONENT
// ============================================

import React from 'react'

function ErrorScreen({ error, onRetry }) {
  return (
    <div className="error-screen">
      <div className="error-sticker">😵</div>
      <h2>oops!</h2>
      <p>{error}</p>
      <p className="error-hint">make sure the backend is running</p>
      <button onClick={onRetry} className="retry-btn">
        try again
      </button>
    </div>
  )
}

export default ErrorScreen
