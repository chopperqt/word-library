import {
  useState,
  useMemo,
  useEffect,
  ChangeEvent,
} from 'react'
import { useSelector } from 'react-redux'

import {
  getPinWords,
  getWords,
} from 'services/library/Library.store'
import { useNavigate } from 'react-router-dom'
import { getUserID } from 'services/user/User.store'
import { getLibraryWords } from 'api/library.api'
import { Links } from 'helpers/links'

const useLibrary = () => {
  const words = useSelector(getWords)
  const pinedWords = useSelector(getPinWords)
  const userID = useSelector(getUserID)
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
      getLibraryWords(userID)

      return
    }

    navigate(Links.signIn)
  }, [
    userID,
    navigate,
  ])

  return {
    value,
    handleChangeValue,
    formattedWords: [],
    pinedWords,
  }
}

export default useLibrary