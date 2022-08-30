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
    <div className='mr-1'>
      <Icon icon={icon} />
    </div>
  )
}

export default Pined