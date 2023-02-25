import TextField from "common/text-field/TextField"
import Button from "components/button"
import InputMulti, { Option } from "components/input-multi"
import ModalContainer from "components/ModalContainer"
import Toggle from "components/Toggle"
import { UNACCEPTABLE_SYMBOL_TEXT } from "helpers/texts"

const ENGLISH_PLACEHOLDER_TEXT = 'Example'
const RUSSIA_PLACEHOLDER_TEXT = 'Пример'
const ADD_TEXT = 'Add'
const UPDATE_TEXT = 'Update'
const TOGGLER_TEXT = 'Add to bookmarks'

interface WordModalProps {
  isOpened: boolean
  isDisabledPin?: boolean
  onClose: () => void
  onSubmit: () => void
  control: any
  translate?: Option[]
  pined?: boolean
  isCheckUniqueWord?: boolean
  isLoading?: boolean
  words?: string[]
  isUpdate?: boolean
  word?: string
}

const WordModal = ({
  onClose,
  onSubmit,
  isOpened,
  pined = false,
  isCheckUniqueWord = false,
  control,
  isLoading = false,
  words = [],
  isUpdate = false,
  translate = [],
  word,
  isDisabledPin = false,
}: WordModalProps) => {
  let text = isUpdate
    ? UPDATE_TEXT
    : ADD_TEXT

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
          value={word}
          pattern={{
            value: /^[a-zA-Z\s]+$/,
            message: UNACCEPTABLE_SYMBOL_TEXT,
          }}
        />
        <InputMulti
          name="translate"
          control={control}
          placeholder={RUSSIA_PLACEHOLDER_TEXT}
          defaultValue={translate}
        />
        <Toggle
          isDisabled={isDisabledPin}
          text={TOGGLER_TEXT}
          name="pined"
          control={control}
          defaultChecked={pined}
        />
        <Button loading={isLoading} type="submit">
          {text}
        </Button>
      </form>
    </ModalContainer>
  )
}

export default WordModal