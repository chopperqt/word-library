import Icon, { IconsList } from "components/icon/Icon"
import WordModal, { useModalWord } from "common/word-modal"

import type { Word } from "models/Library.models"
import type { UserID } from "models/Auth.models"

interface EditProps extends Pick<Word, 'word' | 'translate' | 'pined'> {
  userID: UserID
}

const Edit = ({
  word,
  translate = [],
  pined = false,
  userID,
}: EditProps) => {
  const {
    handleOpen,
    handleClose,
    isOpened,
    handleUpdateWord,
  } = useModalWord({
    userID,
    word,
  })

  return (
    <>
      <button
        onClick={handleOpen}
        className="mr-1"
      >
        <Icon
          icon={IconsList.editOutline}
          className="w-3 h-3"
        />
      </button>
      <WordModal
        isOpened={isOpened}
        onClose={handleClose}
        word={word}
        translate={translate}
        pined={pined}
        onSubmit={handleUpdateWord}
      />
    </>
  )
}

export default Edit