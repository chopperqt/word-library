import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"

import Button from "components/button"
import WordModal, { useModalWord } from "common/word-modal"
import { getUserID } from "services/user/User.store"
import { getLoading } from "services/loading/Loading.store"
import Preloader from "./Preloader"
import { WordForm } from "models/Library.models"

const NO_WORDS_TEXT = 'Welcome to the Word Library'
const DESCRIPTION_TEXT = 'Add your first word'
const ADD_TEXT = 'Add word'

const EmptyContent = () => {
  const userID = useSelector(getUserID)
  const isLoading = useSelector(getLoading).getLibraryWords?.isLoading

  const {
    control,
    handleSubmit: formSubmit,
    reset,
  } = useForm<WordForm>({
    mode: 'onChange',
  })

  const {
    isOpened,
    handleClose,
    handleOpen,
    handleCreateWord,
  } = useModalWord({
    userID,
    reset,
  })

  return (
    <div className="w-screen h-screen flex flex-col  justify-center items-center">
      {isLoading && (
        <Preloader />
      )}
      <div className="text-2xl font-bold text-gray-800">
        {NO_WORDS_TEXT}
      </div>
      <div className="text-xl text-gray-800 mt-3">
        {DESCRIPTION_TEXT}
      </div>
      <Button
        className="mt-10"
        onClick={handleOpen}
      >
        {ADD_TEXT}
      </Button>
      <WordModal
        control={control}
        onSubmit={formSubmit(handleCreateWord)}
        isOpened={isOpened}
        onClose={handleClose}
      />
    </div>
  )
}

export default EmptyContent