import './Podium.css'
import type { PodiumProps, Person } from '../../types'

const HEIGHTS: Record<number, number> = { 1: 160, 2: 120, 3: 90 }

const podiumOrder = (data: Person[]) => {
  if (data.length === 1) return [
    { person: data[0], rank: 1 },
  ]
  if (data.length === 2) return [
    { person: data[1], rank: 2 },
    { person: data[0], rank: 1 },
  ]
  return [
    { person: data[1], rank: 2 },
    { person: data[0], rank: 1 },
    { person: data[2], rank: 3 },
  ]
}

interface PodiumSlotProps {
  person: Person
  rank: number
}

function PodiumSkeleton() {
  return (
    <div className="podium podium--skeleton">
      <div className="podium__skeleton-block small" />
      <div className="podium__skeleton-block large" />
      <div className="podium__skeleton-block medium" />
    </div>
  )
}

function PodiumSlot({ person, rank }: PodiumSlotProps) {
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

function EmptyPodium() {
  return (
    <section className="podium podium--empty">
      <p className="podium__empty-text">✂ Nenhuma indicação ainda</p>
      <p className="podium__empty-subtext">As posições serão atualizadas conforme as indicações chegarem</p>
    </section>
  )
}

function Podium({ data, loading }: PodiumProps) {
  if (loading) return <PodiumSkeleton />
  if (!data || data.length === 0) return <EmptyPodium />

  return (
    <section className="podium">
      {podiumOrder(data).map(({ person, rank }) => (
        <PodiumSlot key={rank} person={person} rank={rank} />
      ))}
    </section>
  )
}

export default Podium