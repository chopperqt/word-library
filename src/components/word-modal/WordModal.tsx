import TextField from "common/text-field/TextField"
import { useEffect } from "react"

import { useForm } from "react-hook-form"

import Button from "../Button"
import InputMulti from "../input-multi/InputMulti"
import ModalContainer from "../ModalContainer"
import Toggle from "../Toggle"
import { normalizeWord } from "./helpers/normalizeWord"

const ENGLISH_PLACEHOLDER_TEXT = 'Example'
const RUSSIA_PLACEHOLDER_TEXT = 'Пример'
const ADD_TEXT = 'Add'
const TOGGLER_TEXT = 'Add to bookmarks'

interface WordModalProps {
  isOpened: boolean
  onClose: () => void
  onSubmit?: () => void
  english?: string[]
  russia?: string[]
  isPined?: boolean
}

const WordModal = ({
  isOpened,
  onClose,
  onSubmit,
  english = [],
  russia = [],
  isPined = false,
}: WordModalProps) => {
  const normalizedEnglish = english.map(normalizeWord)
  const normalizedRussia = russia.map(normalizeWord)
  const {
    control,
    handleSubmit: formSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  })

  const handleSubmit = (data: any) => {
    // TODO Дописать интерфейс который приходит в дата 
    console.log(data)

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
        name="english"
        control={control}
        placeholder={ENGLISH_PLACEHOLDER_TEXT}
        isRequired={true}
      />
      <InputMulti
        name="russia"
        control={control}
        placeholder={RUSSIA_PLACEHOLDER_TEXT}
        defaultValue={normalizedRussia}
      />
      <Toggle
        text={TOGGLER_TEXT}
        name="isPined"
        checked={isPined}
        control={control}
        defaultChecked={isPined}
      />
      <Button>
        {ADD_TEXT}
      </Button>
    </form>
  </ModalContainer>
  )
}

export default WordModal