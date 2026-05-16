import Fuse from 'fuse.js'

const CSV_URL = import.meta.env.VITE_CSV_URL
const CACHE_KEY = 'ranking_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos em ms

function normalize(name) {
    return name
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

export function getCache() {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null
  const { data, timestamp } = JSON.parse(cached)
  const expired = Date.now() - timestamp > CACHE_TTL
  if (expired) return null
  return data
}

function setCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    hash: hashData(data),
    timestamp: Date.now()
  }))
}

function hashData(data) {
  return JSON.stringify(data)
}

export function getStoredHash() {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null
  return JSON.parse(cached).hash ?? null
}

function parseCSV(text) {
    const [headerLine, ...lines] = text.trim().split('\n')
    const headers = headerLine.split(',').map(h => h.trim().toLowerCase())

    return lines.map(line => {
        const values = line.split(',')
        return headers.reduce((obj, header, i) => {
            obj[header] = values[i]?.trim() ?? ''
            return obj
        }, {})
    })
}

function groupByIndicador(rows) {
    const groups = {}

    rows.forEach(row => {
        const raw = row['indicador']
        if (!raw) return
        const key = normalize(raw)

        if (!groups[key]) {
            groups[key] = { name: raw.trim(), referrals: 0 }
        }
        groups[key].referrals++
    })

    return Object.values(groups)
}

function mergeByFuzzy(people) {
    const merged = []

    people.forEach(person => {
        const fuse = new Fuse(merged, {
            keys: ['name'],
            threshold: 0.3,
            includeScore: true,
        })

        const results = fuse.search(person.name)

        if (results.length > 0) {
            results[0].item.referrals += person.referrals
        } else {
            merged.push({ ...person })
        }
    })

    return merged
}

function getInitials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()
}

export async function fetchRanking() {
  const cached = getCache()
  if (cached) return cached

  const response = await fetch(CSV_URL)
  const text = await response.text()

  const rows = parseCSV(text)
  const grouped = groupByIndicador(rows)
  const merged = mergeByFuzzy(grouped) // só roda quando busca a planilha

  const result = merged
    .sort((a, b) => b.referrals - a.referrals)
    .map((person, index) => ({
      id: index + 1,
      name: person.name,
      initials: getInitials(person.name),
      referrals: person.referrals,
    }))

  setCache(result)
  return result
}