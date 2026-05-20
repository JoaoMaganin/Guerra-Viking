import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__box" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal