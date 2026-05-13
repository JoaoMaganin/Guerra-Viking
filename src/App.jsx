import { useState } from 'react'
import Header from './components/Header/Header'
import Podium from './components/Podium/Podium'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Podium />
    </div>
  )
}

export default App
