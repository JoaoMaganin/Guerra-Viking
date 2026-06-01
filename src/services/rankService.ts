import Fuse from 'fuse.js'
import type { Person, CacheData, PersonGroup } from '../types'

const CSV_URL = import.meta.env.VITE_CSV_URL as string
const CACHE_NAME = 'ranking-v1'
const CACHE_TTL = 1 * 60 * 1000


function normalize(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function parseCSV(text: string): Record<string, string>[] {
  const [headerLine, ...lines] = text.trim().split('\n')
  const headers = headerLine.split(',').map(h => h.trim().toLowerCase())

  return lines.map(line => {
    const values = line.split(',')
    return headers.reduce((obj: Record<string, string>, header, i) => {
      obj[header] = values[i]?.trim() ?? ''
      return obj
    }, {})
  })
}

function groupByIndicador(rows: Record<string, string>[]): PersonGroup[] {
  const groups: Record<string, PersonGroup> = {}

  rows.forEach(row => {
    const raw = row['quem indicou']
    const dateRaw = row['data do corte']
    if (!raw) return

    const key = normalize(raw)
    const date = dateRaw ? new Date(dateRaw) : new Date()

    if (!groups[key]) {
      groups[key] = {
        name: raw.trim(),
        referrals: 0,
        directReferrals: 0,
        lastIndicationDate: date,
      }
    }

    groups[key].referrals++
    groups[key].directReferrals++

    if (date > groups[key].lastIndicationDate) {
      groups[key].lastIndicationDate = date
    }
  })

  return Object.values(groups)
}

function mergeByFuzzy(people: PersonGroup[]): PersonGroup[] {
  const merged: PersonGroup[] = []

  people.forEach(person => {
    const fuse = new Fuse(merged, {
      keys: ['name'],
      threshold: 0.3,
      includeScore: true,
    })

    const results = fuse.search(person.name)

    if (results.length > 0) {
      const match = results[0].item
      match.referrals += person.referrals
      if (person.lastIndicationDate > match.lastIndicationDate) {
        match.lastIndicationDate = person.lastIndicationDate
      }
    } else {
      merged.push({ ...person })
    }
  })

  return merged
}

function applyBonusPoints(
  rows: Record<string, string>[],
  groups: PersonGroup[]
): PersonGroup[] {
  const indicadores = new Set(
    rows.map(row => normalize(row['quem indicou'])).filter(Boolean)
  )

  return groups.map(person => {
    const personKey = normalize(person.name)

    const indicados = rows
      .filter(row => normalize(row['quem indicou']) === personKey)
      .map(row => normalize(row['cliente que cortou']))

    const indicadosUnicos = [...new Set(indicados)]

    const bonus = indicadosUnicos.filter(
      indicado => indicadores.has(indicado)
    ).length

    return { ...person, referrals: person.referrals + bonus, bonus }
  })
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export async function getCache(): Promise<Person[] | null> {
  try {
    const cache = await caches.open(CACHE_NAME)
    const response = await cache.match('ranking')
    if (!response) return null

    const { data, timestamp }: CacheData = await response.json()
    if (Date.now() - timestamp > CACHE_TTL) return null

    return data
  } catch {
    return null
  }
}

async function setCache(data: Person[]): Promise<void> {
  try {
    const cache = await caches.open(CACHE_NAME)
    const payload: CacheData = { data, timestamp: Date.now() }
    await cache.put('ranking', new Response(JSON.stringify(payload)))
  } catch {
    // falha silenciosa
  }
}

export async function fetchRanking(): Promise<Person[]> {
  const cached = await getCache()
  if (cached) return cached

  const response = await fetch(CSV_URL)
  const text = await response.text()

  const rows = parseCSV(text)
  const grouped = groupByIndicador(rows)
  const merged = mergeByFuzzy(grouped)
  const withBonus = applyBonusPoints(rows, merged)

  const result: Person[] = withBonus
    .sort((a, b) => {
      if (b.referrals !== a.referrals) return b.referrals - a.referrals
      if (b.directReferrals !== a.directReferrals) return (b.directReferrals ?? 0) - (a.directReferrals ?? 0)
      return a.lastIndicationDate.getTime() - b.lastIndicationDate.getTime()
    })
    .map((person, index) => ({
      id: index + 1,
      name: person.name,
      initials: getInitials(person.name),
      referrals: person.referrals,
      directReferrals: person.directReferrals,
      bonus: person.bonus,
    }))

  await setCache(result)
  return result
}

export async function clearCache(): Promise<void> {
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.delete('ranking')
  } catch {
    // falha silenciosa
  }
}