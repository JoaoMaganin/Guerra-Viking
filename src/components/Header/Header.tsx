import './Header.css'
import Modal from '../Modal/Modal'
import useModal from '../../hooks/useModal'

function Header() {
  const { isOpen, open, close } = useModal()

  return (
    <header className="header">
      <div className="header__stripe" />

      <div className="header__content">
        <p className="header__eyebrow">✦ Ranking de Indicações ✦</p>
        <h1 className="header__title">Barbearia<br />Vikings</h1>
        <p className="header__subtitle">Mês de Maio · 2026</p>

        <button className="header__rules-btn" onClick={open}>
          Regras
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <h2 className="modal__title">Regras do Ranking</h2>
        <div className="modal__content">
          <p>As regras serão definidas em breve.</p>
        </div>
      </Modal>

    </header>
  )
}

export default Header