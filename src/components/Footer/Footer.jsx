import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__brand">Barbearia Vikings</p>
            <p className="footer__credit">
                <span className="footer_span">Desenvolvido por </span>
                <a
                    className="footer__link"
                    href="https://joaomaganin.dev"
                    target="_blank"
                    rel="noopener noreferrer">
                    João Maganin
                </a>
                {' '} © {new Date().getFullYear()}
            </p>
        </footer>
    )
}

export default Footer