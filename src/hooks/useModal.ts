import { useState } from 'react'

interface UseModalReturn {
  isOpen: boolean
  open: () => void
  close: () => void
}

function useModal(): UseModalReturn {
  const [isOpen, setIsOpen] = useState(false)

  const open  = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, open, close }
}

export default useModal