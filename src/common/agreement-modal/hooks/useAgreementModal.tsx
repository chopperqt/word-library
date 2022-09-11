import { useState } from "react"

export const useAgreementModal = () => {
  const [isOpened, setOpened] = useState(false)

  const handleClose = () => {
    setOpened(false)
  }

  const handleOpen = () => {
    setOpened(true)
  }

  return {
    isOpened,
    handleClose,
    handleOpen,
  }
}