import debounce from 'lodash.debounce'

import { wordsMock } from '../../mockData'
import {
  useState,
  useMemo,
} from 'react'

const useLibrary = () => {
  const wordsState = wordsMock
  const [value, setValue] = useState<string>('')

  const handleChangeValue = (e?: any) => {
    if (!e) {
      return
    }

    setValue(e!.target.value)
  }

  const words = useMemo(() => {
    if (!value.length) {
      return wordsState
    }

    return wordsState.filter(({
      english,
      russia,
    }) => {
      const formattedWord = (english.join() + russia.join()).toLowerCase().replaceAll(' ', '')
      const formattedValue = value.toLowerCase().replaceAll(' ', '')

      return formattedWord.includes(formattedValue)
    })
  }, [
    value,
    wordsState,
  ])

  const pinedWords = wordsState.filter((word) => word.pined)

  return {
    value,
    handleChangeValue,
    words,
    pinedWords,
  }
}

export default useLibrary