import { useController } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

import {
  Components,
  customStyles,
} from './constants'
import useInputMulti from './hooks/useInputMulti'
import {
  FIELD_REQUIRED_TEXT,
  UNACCEPTABLE_SYMBOL_TEXT,
} from 'helpers/texts'

import type { InputMultiProps } from '.'

const InputMulti = ({
  placeholder = '',
  control,
  name,
  defaultValue = [],
  isRequired = false,
}: InputMultiProps) => {
  const {
    field: {
      value: fieldValue,
      onChange,
    },
    fieldState: {
      error,
    }
  } = useController({
    control,
    name,
    defaultValue,
    rules: {
      required: {
        value: isRequired,
        message: FIELD_REQUIRED_TEXT,
      },
      pattern: {
        value: /^[а-яА-ЯёЁ\s]+$/,
        message: UNACCEPTABLE_SYMBOL_TEXT,
      }
    }
  })

  const {
    handleChange,
    handleInputChange,
    handleKeyDown,
    inputValue,
  } = useInputMulti({
    onChange,
    value: fieldValue,
  })

  return (
    <div>
      <CreatableSelect
        className='w-full'
        styles={customStyles}
        components={Components}
        isClearable={true}
        isMulti={true}
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        inputValue={inputValue}
        value={fieldValue}
      />
      {error?.message && (
        <div>{error.message}</div>
      )}
    </div>
  )
}

export default InputMulti