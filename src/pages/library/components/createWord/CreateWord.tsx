import React from "react"

import Button from "components/button"
import WordModal, { useModalWord } from "common/word-modal"
import { useForm } from "react-hook-form"
import { WordForm } from "models/Library.models"
import Icon, { IconsList } from "components/icon/Icon"
import useCreateWord from "pages/library/hooks/useCreateWord"

const ADD_TEXT = 'Add'

const CreateWord = () => {
  const {
    reset,
    handleSubmit: formSubmit,
    control,
  } = useForm<WordForm>({
    mode: 'onChange',
  })

  const {
    onSubmit,
    isLoading,
    userID,
    words,
  } = useCreateWord()

  const {
    handleClose,
    handleOpen,
    isOpened,
    handleSubmit,
  } = useModalWord({
    shouldCloseAfterSubmit: true,
    userID,
    reset,
    onSubmit,
  })

  return (
    <React.Fragment>
      <Button
        className="whitespace-nowrap"
        onClick={handleOpen}
      >
        <Icon
          className="block md:hidden fill-white w-5 h-5 hover:fill-white"
          icon={IconsList.plusCircle}
        />
        <div className="hidden md:block">
          {ADD_TEXT}
        </div>
      </Button>
      <WordModal
        isCheckUniqueWord={true}
        onSubmit={formSubmit(handleSubmit)}
        isOpened={isOpened}
        onClose={handleClose}
        control={control}
        isLoading={isLoading}
        words={words}
      />
    </React.Fragment>
  )
}

export default CreateWord