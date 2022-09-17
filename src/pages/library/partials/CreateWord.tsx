import React from "react"
import { useSelector } from "react-redux"

import Button from "components/button"
import { getUserID } from "services/user/User.store"
import WordModal, { useModalWord } from "common/word-modal"
import { useForm } from "react-hook-form"
import { WordForm } from "models/Library.models"
import { getLoading } from "services/loading/Loading.store"
import { getOnlyWords } from "services/library/Library.store"

const ADD_TEXT = 'Add'

const CreateWord = () => {
  const userID = useSelector(getUserID)
  const isLoading = useSelector(getLoading).createLibraryWord?.isLoading
  const words = useSelector(getOnlyWords)

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
        isLoading={isLoading}
        words={words}
      />
    </React.Fragment>
  )
}

export default CreateWord