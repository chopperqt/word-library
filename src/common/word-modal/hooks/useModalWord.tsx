import {
  createLibraryWord,
  getLibraryWords,
  updateLibraryWord,
} from "api/library.api"
import { useEffect, useState } from "react"

import type {
  WordForm,
  WordID,
} from "models/Library.models"
import type { UserID } from "models/Auth.models"
import { getNormalizeWord } from "../helpers/getNormalizeWord"
import type { UseFormSetFocus } from "react-hook-form"
interface UseModalWordProps {
  userID: UserID,
  wordID?: WordID,
  word?: string
  reset?: () => void
  setFocus?: () => void
}
const useModalWord = ({
  userID,
  wordID,
  reset = () => { },
}: UseModalWordProps) => {
  const [isOpened, setOpened] = useState<boolean>(false)

  const handleClose = async () => {
    setOpened(false)
  }

  const handleOpen = () => {
    setOpened(true)
  }

  const handleCreateWord = async (word: WordForm) => {
    const normalizedWord = getNormalizeWord(word)

    const response = await createLibraryWord({
      ...normalizedWord,
      userID,
    })

    if (response === null) {
      return null
    }

    getLibraryWords(userID)
    handleClose()
  }

  const handleUpdateWord = async (word: WordForm) => {
    if (!wordID) {
      return null
    }

    const normalizedWord = getNormalizeWord(word)


    const response = await updateLibraryWord({
      ...normalizedWord,
      wordID,
      userID,
    })

    if (response === null) {
      return null
    }

    getLibraryWords(userID)
    handleClose()
  }

  useEffect(() => {
    if (isOpened) {
      return
    }

    reset()
  }, [
    reset,
    isOpened,
  ])

  return {
    isOpened,
    handleClose,
    handleOpen,
    handleCreateWord,
    handleUpdateWord,
  }
}

export default useModalWord