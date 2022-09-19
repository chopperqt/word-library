import Icon, { IconsList } from "components/icon/Icon"
import WordModal, { useModalWord } from "common/word-modal"

import {
  Word,
  WordForm,
  WordID,
} from "models/Library.models"
import type { UserID } from "models/Auth.models"
import { useForm } from "react-hook-form"
import { getNormalizeOptionWord } from "common/word-modal/helpers/getNormalizeOptionWord"
import { useSelector } from "react-redux"
import { getLoading } from "services/loading/Loading.store"
import { useEffect } from "react"

interface EditProps extends Pick<Word, 'word' | 'translate' | 'pined'> {
  userID: UserID
  wordID: WordID
}

const Edit = ({
  word,
  translate = [],
  pined = false,
  userID,
  wordID,
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

  const isLoading = useSelector(getLoading).updateLibraryWord?.isLoading

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