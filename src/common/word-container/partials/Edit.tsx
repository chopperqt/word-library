import { useForm } from "react-hook-form"

import WordModal, { useModalWord } from "common/word-modal"
import { getNormalizeOptionWord } from "common/word-modal/helpers/getNormalizeOptionWord"
import Icon, { IconsList } from "components/icon/Icon"
import {
  Word,
  WordForm,
  WordID,
} from "models/Library.models"

import type { UserID } from "models/Auth.models"

interface EditProps extends Pick<Word, 'word' | 'translate' | 'pined'> {
  userID: UserID
  wordID: WordID
  isLoading: boolean
}

const Edit = ({
  word,
  translate = [],
  pined = false,
  userID,
  wordID,
  isLoading = false
}: EditProps) => {
  const {
    control,
    reset,
    handleSubmit: formSubmit,
  } = useForm<WordForm>({
    mode: 'onChange',
  })

  const {
    handleOpen,
    handleClose,
    isOpened,
    handleUpdateWord,
  } = useModalWord({
    userID,
    wordID,
    word,
    reset,
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
        isUpdate={true}
        isOpened={isOpened}
        onClose={handleClose}
        control={control}
        onSubmit={formSubmit(handleUpdateWord)}
        isLoading={isLoading}
        word={word}
        translate={translate.map(getNormalizeOptionWord)}
        pined={pined}
      />
    </>
  )
}

export default Edit