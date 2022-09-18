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

  const wordsSearched = useMemo(() => {
    if (value.length < 2) {
      return
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
    value,
    words,
  ])

  const isNothingFound = useMemo(() => {
    return wordsSearched?.length === 0 && value.length !== 0 && value.length > 2
  }, [
    wordsSearched,
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
    wordsSearched,
    isNothingFound,
  }
}

export default useLibrary