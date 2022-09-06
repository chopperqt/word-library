import { createLibraryWord } from "api/library.api"
import { useState } from "react"

import type { CreateWord } from "models/Library.models"


const useModalWord = () => {
  const [isOpened, setOpened] = useState<boolean>(false)

  const handleClose = () => {
    setOpened(false)
  }

  const handleOpen = () => {
    setOpened(true)
  }

  const handleCreateWord = async (data: CreateWord) => {
    await createLibraryWord(data)
  }

  return {
    isOpened,
    handleClose,
    handleOpen,
    handleCreateWord,
  }
}

export default useModalWord