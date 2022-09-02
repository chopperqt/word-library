import { ChangeEvent, useEffect } from 'react'
import { useController } from "react-hook-form"

import Input from "components/Input"

export interface TextFieldProps {
  name: string
  control: any
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
        message: 'Поле обязательное!'
      }
    }
  })

  useEffect(() => {
    if (!value) return

    fieldUpdate(value)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    fieldUpdate(e.target.value)
  }

  return (
    <div className='h-14'>
      <Input
        value={fieldValue}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {!!error?.message && (
        <div className='text-sm text-rose-700'>
          {error.message}
        </div>
      )}
    </div>
  )
}

export default TextField
