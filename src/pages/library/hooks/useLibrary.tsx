import {
  useState,
  useMemo,
} from 'react'
import { useSelector } from 'react-redux'
import {
  getPinWords,
  getWords,
} from 'services/library/Library.store'

const useLibrary = () => {
  const words = useSelector(getWords)
  const pinedWords = useSelector(getPinWords)
  const [value, setValue] = useState<string>('')

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

  return {
    value,
    handleChangeValue,
    formattedWords,
    pinedWords,
  }
}

export default useLibrary