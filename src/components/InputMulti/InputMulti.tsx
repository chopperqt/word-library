import { CSSObjectWithLabel } from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { Components } from './constants'
import useInputMulti from './hooks/useInputMulti'

import type { InputMultiProps } from '.'
import { useController } from 'react-hook-form'

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
        message: 'Поле обязталельное'
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

  const customStyles = {
    control: (provide: CSSObjectWithLabel) => ({
      ...provide,
      border: '2px solid rgb(209 213 219)', //rgb(99 102 241)'
      borderRadius: '0.375rem',
      outline: 'none',
      width: '100%',
    }),
  }

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