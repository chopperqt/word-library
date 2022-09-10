import { useForm } from "react-hook-form"

import TextField from "common/text-field/TextField"
import Button from "components/button"
import InputMulti from "../input-multi/InputMulti"
import ModalContainer from "../ModalContainer"
import Toggle from "../Toggle"
import { getNormalizeOptionWord } from "./helpers/getNormalizeOptionWord"
import { UNACCEPTABLE_SYMBOL_TEXT } from "helpers/texts"
import { useSelector } from "react-redux"
import { getUserID } from "services/user/User.store"

import type { CreateWord } from "models/Library.models"
import type { WordForm } from "models/Library.models"
import { getLoading } from "services/loading/Loading.store"
import { getNormalizeWord } from "./helpers/getNormalizeWord"

const ENGLISH_PLACEHOLDER_TEXT = 'Example'
const RUSSIA_PLACEHOLDER_TEXT = 'Пример'
const ADD_TEXT = 'Add'
const TOGGLER_TEXT = 'Add to bookmarks'

interface WordModalProps {
  isOpened: boolean
  onClose: () => void
  onSubmit?: (data: CreateWord) => void
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
  const normalizedTranslate = translate.map(getNormalizeOptionWord)
  const isLoadingCreate = useSelector(getLoading).createLibraryWord?.isLoading
  const userID = useSelector(getUserID)
  const {
    control,
    handleSubmit: formSubmit,
    reset,
  } = useForm<WordForm>({
    mode: 'onChange',
  })

  const handleSubmit = ({
    pined,
    translate,
    word,
  }: WordForm) => {
    if (!onSubmit) {
      return
    }

    const normalizedWord = getNormalizeWord({
      translate,
      word,
      pined,
    })

    onSubmit({
      ...normalizedWord,
      userID,
    })
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
        defaultValue={normalizedTranslate}
      />
      <Toggle
        text={TOGGLER_TEXT}
        name="pined"
        checked={pined}
        control={control}
        defaultChecked={pined}
      />
      <Button
        loading={isLoadingCreate}
      >
        {ADD_TEXT}
      </Button>
    </form>
  </ModalContainer>
  )
}

export default WordModal