export interface ButtonProps extends React.ComponentProps<'button'> {
  children: string | React.ReactNode | React.ReactNode[]
}
const Button = ({
  children,
  ...props
}: ButtonProps) => (
  <button
    className="
        mt-6
        bg-indigo-600 
        border 
        border-transparent 
        rounded-md 
        py-2 
        px-5 
        flex 
        items-center 
        justify-center 
        text-base 
        font-medium 
        text-white 
        hover:bg-indigo-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-indigo-500"
    {...props}
  >
    {children}
  </button>
)

export default Button