import {
  getLibraryWords,
  updatePin,
} from "api/library.api"
import Icon, { IconsList } from "components/icon/Icon"
import type { UserID } from "models/Auth.models"

interface PinedProps {
  isPined: boolean
  word: string
  userID: UserID
}
const Pined = ({
  isPined,
  word,
  userID,
}: PinedProps) => {
  const icon = isPined
    ? IconsList.starFill
    : IconsList.starOutline

  const handlePinClick = async () => {
    const response = await updatePin(userID, !isPined, word)

    if (response === null) {
      return
    }

    getLibraryWords(userID)
  }

  return (
    <button
      className='mr-1'
      onClick={handlePinClick}
    >
      <Icon
        icon={icon}
        className="w-3 h-3"
      />
    </button>
  )
}

export default Pined