import { useState, useEffect } from 'react'
import './App.css'
import Background from './components/Background/Background'
import Header from './components/Header/Header'
import Podium from './components/Podium/Podium'
import RankingList from './components/RankingList/RankingList'
import Footer from './components/Footer/Footer'
import { fetchRanking, getCache } from './services/rankService'

function App() {
  const [ranking, setRanking] = useState(getCache)
  const [loading, setLoading] = useState(!getCache())

  useEffect(() => {
    fetchRanking()
      .then(data => {
        setRanking(data)
        setLoading(false)
      })
      .catch(err => console.error('Erro:', err))
  }, [])

  return (
    <div className="app">
      <Background />
      <Header />
      <main className="app__content">
        <Podium data={ranking?.slice(0, 3)} loading={loading} />
        <RankingList data={ranking?.slice(3)} loading={loading} />
      </main>
      <Footer />
    </div>
  )
}

export default App