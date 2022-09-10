import Icon, { IconsList } from "components/icon/Icon"

interface PinedProps {
  isPined: boolean
  word: string
}
const Pined = ({
  isPined,
  word,
}: PinedProps) => {


  const icon = isPined
    ? IconsList.starFill
    : IconsList.starOutline

  return (
    <button className='mr-1'>
      <Icon
        icon={icon}
        className="w-3 h-3"
      />
    </button>
  )
}

export default Pined