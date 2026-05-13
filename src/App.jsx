import { useState } from 'react'
import Header from './components/Header/Header'
import Podium from './components/Podium/Podium'
import RankingList from './components/RankingList/RankingList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Podium />
      <RankingList />
    </div>
  )
}

export default App
