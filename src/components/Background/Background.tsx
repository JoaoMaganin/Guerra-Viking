import './Background.css'

const COLS = 5
const ROWS = 4

interface ScissorItem {
  id: number
  size: number
  top: number
  left: number
  duration: number
  delay: number
}

const SCISSORS: ScissorItem[] = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)

  return {
    id: i,
    size: Math.random() * 40 + 24,
    top: (row / ROWS) * 100 + Math.random() * ((100 / ROWS) * 0.6),
    left: (col / COLS) * 100 + Math.random() * ((100 / COLS) * 0.6),
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 10 * -1,
  }
})

interface BackgroundProps {
  theme: 'dark' | 'light'
}

function Background({ theme }: BackgroundProps) {
  const logo = theme === 'light'
    ? `${import.meta.env.BASE_URL}bg-logo-light.png`
    : `${import.meta.env.BASE_URL}bg-logo.png`
  return (
    <div className="background" aria-hidden="true">
      {SCISSORS.map(({ id, size, top, left, duration, delay }) => (
        <img
          key={id}
          src={logo}
          className="background__scissor"
          style={{
            width: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      <div className="background__fire">
        <div className="background__ember background__ember--1" />
        <div className="background__ember background__ember--2" />
        <div className="background__ember background__ember--3" />
        <div className="background__ember background__ember--4" />
        <div className="background__ember background__ember--5" />
      </div>
    </div>
  )
}

export default Background
