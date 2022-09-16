import { ChangeEvent } from "react"
import { useController } from "react-hook-form"

export interface ToggleProps {
  text?: string
  defaultChecked?: boolean
  control: any
  name: string
}
const Toggle = ({
  text,
  defaultChecked = false,
  control,
  name,
}: ToggleProps) => {
  const {
    field: {
      value: fieldValue,
      onChange,
    },
  } = useController({
    control,
    name,
    defaultValue: defaultChecked,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <label
      htmlFor="default-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        onChange={handleChange}
        checked={fieldValue}
        type="checkbox"
        id="default-toggle"
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900">
        {text}
      </span>
    </label>
  )
}

export default Toggle