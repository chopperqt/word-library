import { useState } from "react"

const useModalWord = () => {
  const [isOpened, setOpened] = useState<boolean>(false)

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

export default useModalWord