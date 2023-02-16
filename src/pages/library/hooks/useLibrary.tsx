import {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
  useRef,
} from 'react'

import { useNavigate } from 'react-router-dom'
import { getLibraryWords } from 'api/library.api'

import type { UserID } from 'models/Auth.models'
import type { Word } from 'models/Library.models'

interface UseLibraryProps {
  userID: UserID
  words: Word[]
  isFetched?: boolean
  isLoading?: boolean
}
const useLibrary = ({
  userID,
  words,
  isFetched = false,
  isLoading = false,
}: UseLibraryProps) => {
  const [value, setValue] = useState<string>('')
  const fetchBlockRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

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

  useEffect(() => {
    if (!isFetched) {
      return
    }

    const fetchBlockObserver = new IntersectionObserver((entry) => {
      if (!entry.length) {
        return
      }

      if (entry[0].isIntersecting) {
        getLibraryWords(userID, 71, 140)
      }
    })


    if (!fetchBlockRef.current || !fetchBlockRef) {
      return
    }

    fetchBlockObserver.observe(fetchBlockRef.current)

    return () => {
      fetchBlockObserver.disconnect()
    }
  }, [isFetched, isLoading])

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

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    handleChangeValue,
    wordsSearched,
    isNothingFound,
    fetchBlockRef,
  }
}

export default useLibrary