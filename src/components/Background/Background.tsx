import './Background.css'

const COLS = 5
const ROWS = 4

const SCISSORS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)

  return {
    id: i,
    size: Math.random() * 20 + 14,
    top: (row / ROWS) * 100 + Math.random() * (100 / ROWS * 0.6),
    left: (col / COLS) * 100 + Math.random() * (100 / COLS * 0.6),
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 10 * -1,
  }
})

function Background() {
  return (
    <div className="background" aria-hidden="true">
      {SCISSORS.map(({ id, size, top, left, duration, delay }) => (
        <span
          key={id}
          className="background__scissor"
          style={{
            fontSize: size,
            top: `${top}%`,
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          ✂
        </span>
      ))}
    </div>
  )
}

export default Background