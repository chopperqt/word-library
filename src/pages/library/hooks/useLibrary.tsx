import {
  useState,
  useEffect,
  ChangeEvent,
} from 'react'

import { useNavigate } from 'react-router-dom'
import { getLibraryWords } from 'api/library.api'
import type { UserID } from 'models/Auth.models'

interface UseLibraryProps {
  userID: UserID
}
const useLibrary = ({
  userID,
}: UseLibraryProps) => {

  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // const formattedWords = useMemo(() => {
  //   return []
  //   // if (!value.length) {
  //   //   return words
  //   // }

  //   // return words.filter(({
  //   //   english,
  //   //   russia,
  //   // }) => {
  //   //   const formattedWord = (english.join() + russia.join()).toLowerCase().replaceAll(' ', '')
  //   //   const formattedValue = value.toLowerCase().replaceAll(' ', '')

  //   //   return formattedWord.includes(formattedValue)
  //   // })
  // }, [])

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
    formattedWords: [],
  }
}

export default useLibrary