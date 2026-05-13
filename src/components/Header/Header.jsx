import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__stripe" />

      <div className="header__content">
        <p className="header__eyebrow">✦ Ranking de Indicações ✦</p>
        <h1 className="header__title">Barbearia<br />Vikings</h1>
        <p className="header__subtitle">Mês de Maio · 2026</p>
      </div>
    </header>
  )
}

export default Header