import Button from "components/button"
import WordModal from "components/word-modal/"
import useModalWord from "../hooks/useModalWord"

const NO_WORDS_TEXT = 'Welcome to the Word Library'
const DESCRIPTION_TEXT = 'Add your first word'
const ADD_TEXT = 'Add word'

const EmptyWords = () => {
  const {
    isOpened,
    handleClose,
    handleOpen,
    handleCreateWord,
  } = useModalWord()

  return (
    <div className="w-screen h-screen flex flex-col  justify-center items-center">
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
        onSubmit={handleCreateWord}
        isOpened={isOpened}
        onClose={handleClose}
      />
    </div>
  )
}

export default EmptyWords