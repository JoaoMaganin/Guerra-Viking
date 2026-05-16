import { useState, useEffect } from 'react'
import './RankingList.css'
import { fetchRanking } from '../../services/rankService'

function RankingItemSkeleton({ index }) {
  return (
    <li
      className="ranking-list__skeleton-item"
      style={{ animationDelay: `${index * 0.08}s` }}
    />
  )
}

function RankingItem({ person, rank, index, maxReferrals }) {
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

function RankingList({ data, loading }) {
  const maxReferrals = data?.[0]?.referrals ?? 1

  return (
    <section className="ranking-list">
      <div className="ranking-list__divider" />
      <div className="ranking-list__container">
        <div className="ranking-list__header">
          <span>Classificação</span>
          <span>Indicações</span>
        </div>
        <ul>
          {loading
            ? Array.from({ length: 5 }, (_, i) => (
                <RankingItemSkeleton key={i} index={i} />
              ))
            : data.map((person, index) => (
                <RankingItem
                  key={person.id}
                  person={person}
                  rank={index + 4}
                  index={index}
                  maxReferrals={maxReferrals}
                />
              ))
          }
        </ul>
      </div>
    </section>
  )
}

export default RankingList