import {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
  useRef,
} from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getLibraryWords } from 'api/library.api'

import type { UserID } from 'models/Auth.models'
import type { Word } from 'models/Library.models'
import { useObserver } from 'helpers/useObserver'

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
  const { page } = useParams()
  const { pathname, search } = useLocation()

  const { observer } = useObserver({
    threshold: 0.50,
    callback: () => console.log('work'),
  })

  useEffect(() => {
    if (userID || !fetchBlockRef.current) {
      return
    }

    observer.observe(fetchBlockRef.current)

    return () => {
      observer.disconnect()
    }
  }, [
    observer,
    userID,
  ])

  useEffect(() => {
    if (!userID) {
      return
    }


    const params = new URLSearchParams(search)

    if (params.has('page')) {
      console.log('test')

      return
    }

    params.set('page', "2")

    

    navigate(`${pathname}?${params.toString()}`)

    getLibraryWords(userID)
  }, [userID])

  useEffect(() => {
    console.log('page?: ', page)
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