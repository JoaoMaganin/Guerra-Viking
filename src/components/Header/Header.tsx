import './Header.css'
import Modal from '../Modal/Modal'
import useModal from '../../hooks/useModal'
import type { HeaderProps } from '../../types'


function Header({ theme, toggleTheme }: HeaderProps) {
  const { isOpen, open, close } = useModal();

  return (
    <header className="header">
      <div className="header__stripe" />

      <button className="header__theme-btn" onClick={toggleTheme}>
        {theme === 'dark' ? '☾' : '☀'}
      </button>

      <div className="header__content">
        <p className="header__eyebrow">✦ Ranking de Indicações ✦</p>
        <h1 className="header__title">
          Barbearia
          <br />
          Vikings
        </h1>
        <p className="header__subtitle">Mês de Maio · 2026</p>

        <button className="header__rules-btn" onClick={open}>
          Regras
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <h2 className="modal__title">Regras do Ranking</h2>
        <div className="modal__content">
          <p>Regulamento da Guerra Viking</p>

           <p>A Guerra Viking é a campanha de indicação da Barbearia Vikings.</p>

            <p>Para participar, o cliente deve indicar uma pessoa para realizar um corte na barbearia. Quando a pessoa indicada realizar o corte e informar quem a indicou, o participante ganha 1 ponto no ranking.</p>

            <p>Além disso, se a pessoa indicada também indicar alguém pela primeira vez, o participante original ganha 1 ponto bônus. Esse bônus é limitado a 1 vez por pessoa indicada.</p>

            <p>A pontuação só será validada após o corte ser realizado e cadastrado pela equipe da Barbearia Vikings.</p>

            <p>O ranking será atualizado durante a campanha e poderá ser divulgado nas redes sociais da barbearia.</p>

            <p>Ao final da campanha, o participante com maior pontuação ganhará 2 cortes por mês durante 6 meses, totalizando até 12 cortes gratuitos no período da premiação.</p>

            <p>A premiação é válida exclusivamente para corte de cabelo. Outros serviços, como barba, limpeza de pele, sobrancelha, produtos ou qualquer serviço extra, não estão inclusos.</p>

            <p>O prêmio é pessoal, intransferível, não cumulativo e não poderá ser convertido em dinheiro.</p>

            <p>Os cortes deverão ser realizados mediante agendamento prévio. Caso o vencedor não utilize os 2 cortes disponíveis dentro do mês, os cortes não utilizados não serão acumulados para os meses seguintes.</p>

            <p>Indicações duplicadas, informações falsas, tentativas de fraude ou cadastros inconsistentes poderão ser desconsiderados pela organização.</p>

            <p>Em caso de empate, vence quem tiver mais indicações diretas. Persistindo o empate, vence quem atingiu a pontuação primeiro.</p>

            <p>A Barbearia Vikings se reserva o direito de revisar cadastros, corrigir inconsistências e validar manualmente as indicações sempre que necessário.</p>
        </div>
      </Modal>
    </header>
  )
}

export default Header
