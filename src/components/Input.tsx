import {
  ChangeEvent,
  forwardRef,
} from 'react'

const DEFAULT_STYLE = "w-full px-2 py-1 outline-transparent text-lg focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-2 border-gray-300 rounded-md"

interface InputProps extends React.ComponentProps<'input'> {
  control?: any
  name: string
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const Input = forwardRef(({
  control,
  value = '',
  onChange,
  ...props
}: InputProps, ref: any) => {

  return (
    <input
      onChange={(e) => onChange(e)}
      value={value}
      data-testid="input-field"
      type="input"
      ref={ref}
      className={DEFAULT_STYLE}
      {...props}
    />
  )
})

export default Input