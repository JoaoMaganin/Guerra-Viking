export interface Person {
  id: number
  name: string
  initials: string
  referrals: number
  bonus?: number
}

export interface CacheData {
  data: Person[]
  timestamp: number
}

export interface PodiumProps {
  data: Person[]
  loading: boolean
}

export interface RankingListProps {
  data: Person[]
  loading: boolean
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export type Theme = 'dark' | 'light'

export interface BackgroundProps {
  theme: Theme
}

export interface HeaderProps {
  theme: Theme
  toggleTheme: () => void
}
