import ExtraWordsModal from "components/extra-words-modal/ExtraWordsModal"
import { useState } from "react"

interface ExtraWordsProps {
  words: string[]
}
const ExtraWords = ({
  words = [],
}: ExtraWordsProps) => {
  const [isOpened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(true)
  }

  const handleClose = () => {
    setOpened(false)
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="ml-1 underline text-sky-700 hover:text-sky-500"
        type="button"
      >
        &nbsp;+{words.length - 1}
      </button>
      <ExtraWordsModal
        words={words}
        isOpened={isOpened}
        onClose={handleClose}
      />
    </>
  )
}

export default ExtraWords