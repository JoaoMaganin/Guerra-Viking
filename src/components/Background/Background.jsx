import './Background.css';

const logo = `${import.meta.env.BASE_URL}bg-logo.png`
const COLS = 5
const ROWS = 4

const SCISSORS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)

  return {
    id: i,
    size: Math.random() * 40 + 24,
    top: (row / ROWS) * 100 + Math.random() * (100 / ROWS * 0.6),
    left: (col / COLS) * 100 + Math.random() * (100 / COLS * 0.6),
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 10 * -1,
  }
})

function Background() {
  return (
    <div className="background" aria-hidden="true">
      {/* <img src={logo} alt="" style={{width: '100%', height: '100%'}}/> */}
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
    </div>
  )
}

export default Background