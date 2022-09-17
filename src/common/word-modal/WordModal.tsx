import TextField from "common/text-field/TextField"
import Button from "components/button"
import InputMulti from "components/input-multi"
import ModalContainer from "components/ModalContainer"
import Toggle from "components/Toggle"
import { getNormalizeOptionWord } from "./helpers/getNormalizeOptionWord"
import { UNACCEPTABLE_SYMBOL_TEXT } from "helpers/texts"

import type { Word } from "models/Library.models"

const ENGLISH_PLACEHOLDER_TEXT = 'Example'
const RUSSIA_PLACEHOLDER_TEXT = 'Пример'
const ADD_TEXT = 'Add'
const TOGGLER_TEXT = 'Add to bookmarks'

interface WordModalProps {
  isOpened: boolean
  onClose: () => void
  onSubmit: () => void
  control: any
  translate?: string[]
  pined?: boolean
  isCheckUniqueWord?: boolean
  isLoading?: boolean
  words?: string[]
}

const WordModal = ({
  onClose,
  onSubmit,
  translate = [],
  isOpened = false,
  pined = false,
  isCheckUniqueWord = false,
  control,
  isLoading = false,
  words = []
}: WordModalProps) => {
  const normalizedTranslate = translate.map(getNormalizeOptionWord)

  return (
    <ModalContainer
      isOpened={isOpened}
      onClose={onClose}
    >
      <form
        className="w-full max-w-2xl flex flex-col gap-3"
        onSubmit={onSubmit}
        data-testid="word-modal-form"
      >
        <TextField
          isCheckUniqueWord={isCheckUniqueWord}
          name="word"
          control={control}
          placeholder={ENGLISH_PLACEHOLDER_TEXT}
          isRequired={true}
          words={words}
          pattern={{
            value: /^[a-zA-Z\s]+$/,
            message: UNACCEPTABLE_SYMBOL_TEXT,
          }}
        />
        <InputMulti
          name="translate"
          control={control}
          placeholder={RUSSIA_PLACEHOLDER_TEXT}
          defaultValue={normalizedTranslate}
        />
        <Toggle
          text={TOGGLER_TEXT}
          name="pined"
          control={control}
          defaultChecked={pined}
        />
        <Button loading={isLoading}>
          {ADD_TEXT}
        </Button>
      </form>
    </ModalContainer>
  )
}

export default WordModal