interface InputProps extends React.ComponentProps<'input'> { }
const Input = ({
  ...props
}: InputProps) => (
  <input
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

export default Input