import { useForm } from "react-hook-form"

import WordModal, { useModalWord } from "common/word-modal"
import { getNormalizeOptionWord } from "common/word-modal/helpers/getNormalizeOptionWord"
import Icon, { IconsList } from "components/icon/Icon"
import {
  Word,
  WordForm,
  WordID,
} from "models/Library.models"

interface EditProps extends Pick<Word, 'word' | 'translate' | 'pined'> {
  wordID: WordID
  isLoading: boolean
  onSubmit: (word: WordForm, wordID?: number) => Promise<Word[] | null>
  shouldCloseAfterSubmit?: boolean
}

const Edit = ({
  word,
  translate = [],
  pined = false,
  wordID,
  isLoading = false,
  onSubmit,
  shouldCloseAfterSubmit = true,
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
    handleSubmit,
  } = useModalWord({
    onSubmit,
    wordID,
    reset,
    shouldCloseAfterSubmit,
  })

  return (
    <>
      <button
        onClick={handleOpen}
        className="mr-1"
        type="button"
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
        onSubmit={formSubmit(handleSubmit)}
        isLoading={isLoading}
        word={word}
        translate={translate.map(getNormalizeOptionWord)}
        pined={pined}
      />
    </>
  )
}

export default Edit