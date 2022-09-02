import {
  ChangeEvent,
  useEffect,
  forwardRef,
} from 'react'

interface InputProps extends React.ComponentProps<'input'> {
  control?: any
  name: string
  value?: string
}
const Input = forwardRef(({
  control,
  value = '',
  onChange,
  ...props
}: InputProps, ref: any) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  useEffect(() => {
    if (!value) {
      return
    }

  }, [])

  return (
    <input
      onChange={(e) => handleChange(e)}
      value={value}
      data-testid="input-field"
      type="input"
      ref={ref}
      className="
          w-full
          px-2
          py-1
          outline-transparent
          text-lg
          focus:ring-indigo-500 
          focus:border-indigo-500 
          block 
          shadow-sm 
          border-2
          border-gray-300 
          rounded-md
          "
      {...props}
    />
  )
})

export default Input