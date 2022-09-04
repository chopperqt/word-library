import { useState } from "react"

import Icon, { IconsList } from "components/icon/Icon"
import WordModal from "components/word-modal/WordModal"

import type { WordForm } from "models/Library.models"

const Edit = ({
  word,
  translate = [],
  pined = false,
}: WordForm) => {
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
        word={word}
        translate={translate}
        pined={pined}
      />
    </>
  )
}

export default Edit