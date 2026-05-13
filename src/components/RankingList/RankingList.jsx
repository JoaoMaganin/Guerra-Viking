import './RankingList.css'
import { rankingData } from '../../data/rankingData'

const maxReferrals = rankingData[0].referrals
const listData = rankingData.slice(3)

function RankingItem({ person, rank, index }) {
  const barWidth = Math.round((person.referrals / maxReferrals) * 100)

  return (
    <li className="ranking-list__item" style={{ animationDelay: `${index * 0.08}s` }}>
      <span className="ranking-list__rank">{rank}</span>

      <div className="ranking-list__avatar">{person.initials}</div>

      <span className="ranking-list__name">{person.name}</span>

      <div className="ranking-list__bar">
        <div
          className="ranking-list__bar-fill"
          style={{ '--bar-width': `${barWidth}%` }}
        />
      </div>

      <span className="ranking-list__count">{person.referrals}</span>
    </li>
  )
}

function RankingList() {
  return (
    <section className="ranking-list">
      <div className="ranking-list__divider" />

      <div className="ranking-list__container">
        <div className="ranking-list__header">
          <span>Classificação</span>
          <span>Indicações</span>
        </div>

        <ul>
          {listData.map((person, index) => (
            <RankingItem
              key={person.id}
              person={person}
              rank={index + 4}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default RankingList