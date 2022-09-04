import { useForm } from "react-hook-form"

import TextField from "common/text-field/TextField"
import Button from "../Button"
import InputMulti from "../input-multi/InputMulti"
import ModalContainer from "../ModalContainer"
import Toggle from "../Toggle"
import { normalizeWord } from "./helpers/normalizeWord"

import type { WordForm } from "models/Library.models"

const ENGLISH_PLACEHOLDER_TEXT = 'Example'
const RUSSIA_PLACEHOLDER_TEXT = 'Пример'
const ADD_TEXT = 'Add'
const TOGGLER_TEXT = 'Add to bookmarks'

interface WordModalProps {
  isOpened: boolean
  onClose: () => void
  onSubmit?: () => void
  word?: string
  translate?: string[]
  pined?: boolean
}

const WordModal = ({
  onClose,
  onSubmit,
  word,
  translate = [],
  isOpened = false,
  pined = false,
}: WordModalProps) => {
  const normalizedTranslate = translate.map(normalizeWord)
  const {
    control,
    handleSubmit: formSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      word,
      translate,
      pined,
    }
  })

  const handleSubmit = (data: Partial<WordForm>) => {
    if (onSubmit) {
      onSubmit()
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (<ModalContainer
    isOpened={isOpened}
    onClose={handleClose}
  >
    <form
      className="w-full max-w-2xl flex flex-col gap-3"
      onSubmit={formSubmit(handleSubmit)}
    >
      <TextField
        name="word"
        control={control}
        placeholder={ENGLISH_PLACEHOLDER_TEXT}
        isRequired={true}
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
        checked={pined}
        control={control}
        defaultChecked={pined}
      />
      <Button>
        {ADD_TEXT}
      </Button>
    </form>
  </ModalContainer>
  )
}

export default WordModal