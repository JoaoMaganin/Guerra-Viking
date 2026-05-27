import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import GuerraViking from './pages/GuerraViking/GuerraViking'
import useTheme from './hooks/useTheme'
import type { Person } from './types'
import { getCache, fetchRanking, clearCache } from './services/rankService'

function App() {
  const [ranking, setRanking] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    getCache().then(cached => {
      if (cached) {
        setRanking(cached)
        setLoading(false)
      }
      fetchRanking().then(data => {
        setRanking(data)
        setLoading(false)
      })
    })

    const interval = setInterval(async () => {
      await clearCache()
      fetchRanking().then(data => setRanking(data))
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/Guerra-Viking"
        element={
          <GuerraViking
            theme={theme}
            toggleTheme={toggleTheme}
            ranking={ranking}
            loading={loading}
          />
        }
      />
    </Routes>
  )
}

export default App