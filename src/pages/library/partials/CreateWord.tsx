import React from "react"
import { useSelector } from "react-redux"

import Button from "components/button"
import { getUserID } from "services/user/User.store"
import WordModal, { useModalWord } from "common/word-modal"
import { useForm } from "react-hook-form"
import { WordForm } from "models/Library.models"

const ADD_TEXT = 'Add'

const CreateWord = () => {
  const userID = useSelector(getUserID)

  const {
    reset,
    handleSubmit: formSubmit,
    control,
  } = useForm<WordForm>({
    mode: 'onChange',
  })

  const {
    handleClose,
    handleOpen,
    isOpened,
    handleCreateWord,
  } = useModalWord({
    userID,
    reset,
  })

  return (
    <React.Fragment>
      <Button
        className="whitespace-nowrap"
        onClick={handleOpen}
      >
        {ADD_TEXT}
      </Button>
      <WordModal
        isCheckUniqueWord={true}
        onSubmit={formSubmit(handleCreateWord)}
        isOpened={isOpened}
        onClose={handleClose}
        control={control}
      />
    </React.Fragment>
  )
}

export default CreateWord