import Button from "components/Button"
import WordModal from "components/word-modal/"
import useModalWord from "../hooks/useModalWord"

const NO_WORDS_TEXT = 'Добро пожаловать в Библиотеку слов'
const DESCRIPTION_TEXT = 'Добавьте ваше первое слово'
const ADD_TEXT = 'Добавить слово'

const EmptyWords = () => {
  const {
    isOpened,
    handleClose,
    handleOpen,
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
        isOpened={isOpened}
        onClose={handleClose}
      />
    </div>
  )
}

export default EmptyWords