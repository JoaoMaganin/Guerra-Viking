import { useState } from 'react'
import Header from './components/Header/Header'
import Podium from './components/Podium/Podium'
import RankingList from './components/RankingList/RankingList'
import './App.css'
import Background from './components/Background/Background'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      {console.log('deploy test')}
      <Background />
      <Header />
      <Podium />
      <RankingList />
    </div>
  )
}

export default App
