import { createLibraryWord, getLibraryWords, updateLibraryWord } from "api/library.api"
import { useState } from "react"

import type {
  WordForm,
  WordID,
} from "models/Library.models"
import type { UserID } from "models/Auth.models"
import { getNormalizeWord } from "../helpers/getNormalizeWord"
interface UseModalWordProps {
  userID: UserID,
  wordID?: WordID,
  word?: string
  reset?: () => void
}
const useModalWord = ({
  userID,
  wordID,
  reset,
}: UseModalWordProps) => {
  const [isOpened, setOpened] = useState<boolean>(false)

  const handleClose = () => {
    if (reset) {
      reset()
    }

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
    // if (!wordID) {
    //   return null
    // }

    // const normalizedWord = getNormalizeWord(word)


    // const response = await updateLibraryWord({
    //   ...normalizedWord,
    //   wordID,
    //   userID,
    // })

    // if (response === null) {
    //   return null
    // }

    // getLibraryWords(userID)
    // handleClose()
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