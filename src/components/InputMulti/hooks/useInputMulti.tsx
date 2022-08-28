import {
  useState,
  KeyboardEventHandler,
} from 'react'

import { OnChangeValue } from 'react-select'
import { createOption } from '../helpers/createOption'

import type { Option } from '../'

interface UseInputMulti {
  onChange: (...event: any[]) => void
  value: Option[]
}
const useInputMulti = ({
  onChange,
  value = [],
}: UseInputMulti) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (value: OnChangeValue<Option, true>) => {
    onChange([...value])
  }

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!inputValue) {
      return
    }

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setInputValue('')
        onChange([...value, createOption(inputValue)])
        event.preventDefault()
    }
  }

  return {
    handleChange,
    handleInputChange,
    handleKeyDown,
    inputValue,
  }
}

export default useInputMulti