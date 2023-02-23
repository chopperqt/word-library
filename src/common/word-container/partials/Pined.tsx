import Icon, { IconsList } from "components/icon/Icon"

interface PinedProps {
  isPined: boolean
  isDisabled?: boolean
  onClick: () => void
}
const Pined = ({
  isPined,
  onClick,
  isDisabled = false
}: PinedProps) => {
  const disabled = isDisabled && !isPined
  let className = 'w-3 h-3 '

  let icon = IconsList.starOutline

  if (isPined) {
    icon = IconsList.starFill
  }

  if (disabled) {
    className = className + ' fill-blue-100 hover:fill-blue-100'
  }

  return (
    <button
      className="mr-1"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        icon={icon}
        className={className}
      />
    </button>
  )
}

export default Pined