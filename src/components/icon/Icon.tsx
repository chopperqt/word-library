import { IconsList } from "./IconList"

interface IconProps {
  icon: JSX.Element,
  className?: string
}
const Icon = ({
  icon,
  className,
}: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    className={`fill-sky-700 hover:fill-sky-500 text-md w-5 h-5 ${className}`}
  >
    {icon}
  </svg>
)

export default Icon

export { IconsList }