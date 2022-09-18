import {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
} from 'react'

import { useNavigate } from 'react-router-dom'
import { getLibraryWords } from 'api/library.api'

import type { UserID } from 'models/Auth.models'
import type { Word } from 'models/Library.models'

interface UseLibraryProps {
  userID: UserID
  words: Word[]
}
const useLibrary = ({
  userID,
  words,
}: UseLibraryProps) => {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const searchWords = useMemo(() => {
    if (!value.length) {
      return []
    }

    return words.filter(({
      word,
      translate,
    }) => {
      const formattedWord = (word + translate.join('')).toLowerCase().replaceAll(' ', '')
      const formattedValue = value.toLowerCase().replaceAll(' ', '')

      return formattedWord.includes(formattedValue)
    })
  }, [
    words,
    value,
  ])

  useEffect(() => {
    if (userID) {
      return
    }
  }, [
    userID,
    navigate,
  ])

  useEffect(() => {
    if (!userID) {
      return
    }

    getLibraryWords(userID)
  }, [userID])

  return {
    value,
    handleChangeValue,
    searchWords,
  }
}

export default useLibrary