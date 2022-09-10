import { ChangeEvent, useEffect } from 'react'
import { useController } from "react-hook-form"

import Input from "components/Input"
import { FIELD_REQUIRED_TEXT } from 'helpers/texts'
import { useSelector } from 'react-redux'
import { getWords } from 'services/library/Library.store'
export interface TextFieldProps {
  name: string
  control?: any
  placeholder?: string
  value?: string
  isRequired?: boolean
  className?: string
  type?: string
  defaultValue?: string
  pattern?: {
    value: string | RegExp
    message: string
  }
}

const ALREADY_EXIST_TEXT = 'The word already exists'

const TextField = ({
  name,
  placeholder,
  control,
  isRequired = false,
  pattern,
  className,
  value,
  type = 'input',
}: TextFieldProps) => {
  const words = useSelector(getWords)
  let defaultRules: { [key: string]: unknown } = {
    required: {
      value: isRequired,
      message: FIELD_REQUIRED_TEXT,
    },
  }

  if (pattern) {
    defaultRules = {
      ...defaultRules,
      pattern,
    }
  }

  const {
    field: {
      onChange: fieldUpdate,
      value: fieldValue = '',
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
      ...defaultRules,
      validate: {
        checkTheSame: (str: string): boolean => {
          return !words.filter(({ word }) => word.toLowerCase().replace(' ', '') === str.toLowerCase().replace(' ', '')).length
        }
      }
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    fieldUpdate(e.target.value)
  }

  useEffect(() => {
    if (!value) return

    fieldUpdate(value)
  }, [
    value,
    fieldUpdate,
  ])

  return (
    <div className={`h-14 ${className}`}>
      <Input
        data-testid="text-field"
        ref={ref}
        onBlur={onBlur}
        value={fieldValue}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        type={type}
      />
      {error?.type === 'checkTheSame' && (
        <div
          className='text-sm text-rose-700 flex'
          data-testid="text-field-error"
        >
          {ALREADY_EXIST_TEXT}
        </div>
      )}
      {error?.message && (
        <div
          className='text-sm text-rose-700 flex'
          data-testid="text-field-error"
        >
          {error.message}
        </div>
      )}
    </div>
  )
}

export default TextField
