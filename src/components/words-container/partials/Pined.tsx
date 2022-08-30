import Icon, { IconsList } from "components/icon/Icon"

interface PinedProps {
  isPined: boolean
}
const Pined = ({
  isPined,
}: PinedProps) => {
  const icon = isPined
    ? IconsList.starFill
    : IconsList.starOutline

  return (
    <button className='mr-1'>
      <Icon icon={icon} />
    </button>
  )
}

export default Pined