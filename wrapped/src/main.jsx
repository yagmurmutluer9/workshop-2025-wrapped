// ============================================
// 🎓 WORKSHOP: Entry Point
// ============================================
// This is where React starts!
// It finds the element with id="root" in index.html
// and renders our App component inside it.
// ============================================

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// Render the App component into the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
