import { IconsList } from "./IconList"

interface IconProps {
  icon: JSX.Element,
}
const Icon = ({
  icon,
}: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    {icon}
  </svg>
)

export default Icon

export { IconsList }