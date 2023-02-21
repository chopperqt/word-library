import Icon, { IconsList } from "components/icon/Icon"

interface PinedProps {
  isPined: boolean
  onClick: () => void
}
const Pined = ({
  isPined,
  onClick,
}: PinedProps) => {
  let icon = IconsList.starOutline

  if (isPined) {
    icon = IconsList.starFill
  }

  return (
    <button
      className='mr-1'
      onClick={onClick}
    >
      <Icon
        icon={icon}
        className="w-3 h-3"
      />
    </button>
  )
}

export default Pined