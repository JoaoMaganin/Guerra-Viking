import './Podium.css'
import { rankingData } from '../../data/rankingData'

const MEDALS = {
  1: { colorVar: '--color-gold',   label: 'Ouro'   },
  2: { colorVar: '--color-silver', label: 'Prata'  },
  3: { colorVar: '--color-bronze', label: 'Bronze' },
}

const HEIGHTS = { 1: 160, 2: 120, 3: 90 }

const podiumOrder = [
  { person: rankingData[1], rank: 2 },
  { person: rankingData[0], rank: 1 },
  { person: rankingData[2], rank: 3 },
]

function PodiumSlot({ person, rank }) {
  return (
    <div className={`podium__slot podium__slot--${rank}`}>

      <div className="podium__info">
        {rank === 1 && <span className="podium__crown">♛</span>}
        <div className={`podium__avatar podium__avatar--${rank}`}>
          {person.initials}
        </div>
        <p className="podium__name">{person.name}</p>
        <p className={`podium__count podium__count--${rank}`}>
          {person.referrals} indicações
        </p>
      </div>

      <div className="podium__block" style={{ height: HEIGHTS[rank] }}>
        <span className="podium__rank-number">{rank}</span>
      </div>

    </div>
  )
}

function Podium() {
  return (
    <section className="podium">
      {podiumOrder.map(({ person, rank }) => (
        <PodiumSlot key={rank} person={person} rank={rank} />
      ))}
    </section>
  )
}

export default Podium