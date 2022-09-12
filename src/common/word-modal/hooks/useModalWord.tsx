import { createLibraryWord, getLibraryWords, updateLibraryWord } from "api/library.api"
import { useState } from "react"

import type { CreateWord } from "models/Library.models"
import type { UserID } from "models/Auth.models"
interface UseModalWordProps {
  userID: UserID,
  word?: string
}
const useModalWord = ({
  userID,
  word,
}: UseModalWordProps) => {
  const [isOpened, setOpened] = useState<boolean>(false)

  const handleClose = () => {
    setOpened(false)
  }

  const handleOpen = () => {
    setOpened(true)
  }

  const handleCreateWord = async (data: CreateWord) => {
    const response = await createLibraryWord(data)

    if (response === null) {
      return
    }

    getLibraryWords(userID)

    handleClose()
  }

  const handleUpdateWord = async (data: CreateWord) => {
    if (!word) {
      return
    }

    const response = await updateLibraryWord(data, word)

    if (response === null) {
      return
    }

    getLibraryWords(userID)
  }

  return {
    isOpened,
    handleClose,
    handleOpen,
    handleCreateWord,
    handleUpdateWord,
  }
}

export default useModalWord