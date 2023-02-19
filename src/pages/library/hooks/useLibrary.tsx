import {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { getLibraryWords } from 'api/library.api'
import { useObserver } from 'helpers/useObserver'
import { usePagination } from 'helpers/usePagination'
import { getAmountOfPages, getPage, handleIncreasePage, setPage } from 'services/pagination/Pagination.store'

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
  const { pathname, search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const currentPage = searchParams.get('page')

  const page = useSelector(getPage)
  const amountOfPages = useSelector(getAmountOfPages)
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const fetchBlockRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const { from, to, isLastPage, } = usePagination({
    page: +page,
    amountOfPages,
  })

  const callback = useCallback(() => {
    if (!isFetched || isLoading) {
      return
    }

    dispatch(handleIncreasePage())
  }, [isFetched, isLoading])

  const { observer } = useObserver({
    threshold: 0.95,
    callback,
    element: fetchBlockRef,
  })

  useEffect(() => {
    if (!userID) {
      return
    }

    searchParams.set('page', page.toString())

    navigate(`${pathname}?${searchParams.toString()}`)

    if (!words.length) {
      getLibraryWords(userID, 0, to)

      return
    }

    getLibraryWords(userID, from, to)
  }, [page, userID])

  useEffect(() => {
    if (!fetchBlockRef.current) {
      return
    }

    observer.observe(fetchBlockRef.current)

    return () => {
      observer.disconnect()
    }
  }, [fetchBlockRef])

  useLayoutEffect(() => {
    if (!currentPage) {
      return
    }

    dispatch(setPage(+currentPage))
  }, [])

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
    isLastPage,
  }
}

export default useLibrary