import { ChangeEvent, useEffect } from 'react'
import { useController } from "react-hook-form"

import Input from "components/Input"
import {
  FIELD_REQUIRED_TEXT,
  UNACCEPTABLE_SYMBOL_TEXT,
} from 'helpers/texts'

export interface TextFieldProps {
  name: string
  control?: any
  placeholder?: string
  value?: string
  isRequired?: boolean
}
const TextField = ({
  name,
  placeholder,
  control,
  value,
  isRequired = false,
}: TextFieldProps) => {
  const {
    field: {
      onChange: fieldUpdate,
      value: fieldValue,
      ref,
      onBlur,
    },
    fieldState: {
      error,
    },
  } = useController({
    control,
    name,
    rules: {
      required: {
        value: isRequired,
        message: FIELD_REQUIRED_TEXT,
      },
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: UNACCEPTABLE_SYMBOL_TEXT,
      }
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    fieldUpdate(e.target.value)
  }

  useEffect(() => {
    if (!value) return

    fieldUpdate(value)
  }, [value])

  return (
    <div className='h-14'>
      <Input
        data-testid="text-field"
        ref={ref}
        onBlur={onBlur}
        value={fieldValue}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
      {error?.message && (
        <div
          className='text-sm text-rose-700'
          data-testid="text-field-error"
        >
          {error.message}
        </div>
      )}
    </div>
  )
}

export default TextField
