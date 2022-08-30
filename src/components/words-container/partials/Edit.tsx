import { useState } from "react"

import Icon, { IconsList } from "components/icon/Icon"
import WordModal from "components/word-modal/WordModal"

interface EditProps {
  english: string[]
  russia: string[]
  isPined: boolean
}
const Edit = ({
  english,
  russia,
  isPined,
}: EditProps) => {
  const [isOpened, setOpened] = useState<boolean>(false)

  const handleOpen = () => {
    setOpened(true)
  }

  const handleClose = () => {
    setOpened(false)
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="mr-1"
      >
        <Icon icon={IconsList.editOutline} />
      </button>
      <WordModal
        isOpened={isOpened}
        onClose={handleClose}
        english={english}
        russia={russia}
        isPined={isPined}
      />
    </>
  )
}

export default Edit