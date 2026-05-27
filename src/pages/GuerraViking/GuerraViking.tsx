import Background from '../../components/Background/Background'
import Header from '../../components/Header/Header'
import Podium from '../../components/Podium/Podium'
import RankingList from '../../components/RankingList/RankingList'
import Footer from '../../components/Footer/Footer'
import type { Person, Theme } from '../../types'

interface GuerraVikingProps {
  theme: Theme
  toggleTheme: () => void
  ranking: Person[]
  loading: boolean
}

function GuerraViking({ theme, toggleTheme, ranking, loading }: GuerraVikingProps) {
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

export default GuerraViking;