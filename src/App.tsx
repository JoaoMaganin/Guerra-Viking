import { useState, useEffect } from 'react'
import './App.css'
import Background from './components/Background/Background'
import Header from './components/Header/Header'
import Podium from './components/Podium/Podium'
import RankingList from './components/RankingList/RankingList'
import Footer from './components/Footer/Footer'
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
    }, 1 * 60 * 1000) // Atualiza a cada 1 minuto

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <Background theme={theme} />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="app__content">
        <Podium data={ranking.slice(0, 3)} loading={loading} />
        <RankingList data={ranking.slice(3, 10)} loading={loading} />
      </main>
      <Footer />
    </div>
  )
}

export default App