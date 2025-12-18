# 🎓 Workshop: React Frontend

A simplified React app for learning purposes.

## 📁 Project Structure

```
frontend-shareable/
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Build tool config
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Main component (READ THIS!)
    ├── App.css         # Component styles
    └── index.css       # Global styles
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📚 What You'll Learn

### In `App.jsx`:

1. **Components** - Reusable pieces of UI
   - `Card` - A reusable card component
   - `SongItem` - Displays a song
   - `StatBox` - Displays a statistic
   - `LoadingScreen` - Shows while loading
   - `ErrorScreen` - Shows on error

2. **Props** - Passing data to components
   ```jsx
   <Card title="Stats" emoji="📊" color="#6366f1">
     {children}
   </Card>
   ```

3. **State** - Data that changes
   ```jsx
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(true)
   ```

4. **useEffect** - Run code when component loads
   ```jsx
   useEffect(() => {
     fetchData()
   }, [])
   ```

5. **Conditional Rendering** - Show different things
   ```jsx
   if (loading) return <LoadingScreen />
   if (error) return <ErrorScreen />
   return <MainContent />
   ```

6. **Lists** - Rendering arrays
   ```jsx
   {songs.map((song, index) => (
     <SongItem key={index} song={song} />
   ))}
   ```

## 🔗 Backend Connection

The app fetches data from:
```
http://localhost:3001/api/wrapped
```

Make sure the backend is running!

## 💡 Exercises

1. **Add a new stat** to the stats grid
2. **Change the colors** in CSS variables
3. **Add a new Card** with your own content
4. **Modify the goals list** with your own goals

---

Happy coding! 🎉
