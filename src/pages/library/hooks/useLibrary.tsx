import {
  useState,
  useMemo,
  useEffect,
} from 'react'
import { useSelector } from 'react-redux'

import {
  getPinWords,
  getWords,
} from 'services/library/Library.store'
import { useNavigate } from 'react-router-dom'
import { getUserID } from 'services/user/User.store'

const useLibrary = () => {
  const words = useSelector(getWords)
  const pinedWords = useSelector(getPinWords)
  const userID = useSelector(getUserID)
  const [value, setValue] = useState<string>('')

  const navigate = useNavigate()

  const handleChangeValue = (e?: any) => {
    if (!e) {
      return
    }

    setValue(e!.target.value)
  }

  const formattedWords = useMemo(() => {
    return []
    // if (!value.length) {
    //   return words
    // }

    // return words.filter(({
    //   english,
    //   russia,
    // }) => {
    //   const formattedWord = (english.join() + russia.join()).toLowerCase().replaceAll(' ', '')
    //   const formattedValue = value.toLowerCase().replaceAll(' ', '')

    //   return formattedWord.includes(formattedValue)
    // })
  }, [])

  useEffect(() => {
    if (userID) {
      return
    }

    navigate('/')
  }, [
    userID,
    navigate,
  ])

  return {
    value,
    handleChangeValue,
    formattedWords,
    pinedWords,
  }
}

export default useLibrary