import { useSelector } from "react-redux"

import TextField from "common/text-field/TextField"
import Button from "components/button"
import InputMulti from "components/input-multi"
import ModalContainer from "components/ModalContainer"
import Toggle from "components/Toggle"
import { getNormalizeOptionWord } from "./helpers/getNormalizeOptionWord"
import { UNACCEPTABLE_SYMBOL_TEXT } from "helpers/texts"
import { getLoading } from "services/loading/Loading.store"

const ENGLISH_PLACEHOLDER_TEXT = 'Example'
const RUSSIA_PLACEHOLDER_TEXT = 'Пример'
const ADD_TEXT = 'Add'
const TOGGLER_TEXT = 'Add to bookmarks'

interface WordModalProps {
  isOpened: boolean
  onClose: () => void
  onSubmit: () => void
  translate?: string[]
  pined?: boolean
  isCheckUniqueWord?: boolean
  control: any
}

const WordModal = ({
  onClose,
  onSubmit,
  translate = [],
  isOpened = false,
  pined = false,
  isCheckUniqueWord = false,
  control,
}: WordModalProps) => {
  const normalizedTranslate = translate.map(getNormalizeOptionWord)
  const isLoadingCreate = useSelector(getLoading).createLibraryWord?.isLoading
  const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading

  return (
    <ModalContainer
      isOpened={isOpened}
      onClose={onClose}
    >
      <form
        className="w-full max-w-2xl flex flex-col gap-3"
        onSubmit={onSubmit}
      >
        <TextField
          isCheckUniqueWord={isCheckUniqueWord}
          name="word"
          control={control}
          placeholder={ENGLISH_PLACEHOLDER_TEXT}
          isRequired={true}
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
        <Button
          loading={isLoadingCreate || isLoadingUpdate}
        >
          {ADD_TEXT}
        </Button>
      </form>
    </ModalContainer>
  )
}

export default WordModal