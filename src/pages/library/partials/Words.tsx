import WordsContainer from "components/words-container/WordsContainer";
import normalizeWords from "../../../helpers/normalizeWords";
import type { Word } from "models/Library.models";

interface WordsProps {
  words: Word[]
  pinedWords: Word[]
}
const Words = ({
  words,
  pinedWords = [],
}: WordsProps) => {
  const normalizedWords = normalizeWords(words)
  const normalizedPinedWords = normalizeWords(pinedWords)
  const formattedLibrary = `Library(${words.length})`

  const formattedPined = pinedWords.length
    ? `Pined(${pinedWords.length})`
    : 'Pined'

  return (
    <div className="flex flex-col items-start gap-3 flex-wrap">
      <div className="text-2xl">{formattedPined}</div>
      <div className="flex justify-start items-start gap-3 flex-wrap">
        {Object.entries(normalizedPinedWords).map(([key, words]: [key: string, words: any]) => {
          const amountOfWords = words.length

          if (!amountOfWords) {
            return null
          }

          return (
            <WordsContainer
              key={key}
              letter={key}
              amountOfWords={amountOfWords}
              words={words}
              color="bg-indigo-700"
            />
          )
        })}
      </div>
      <div className="text-2xl mt-5">{formattedLibrary}</div>
      <div className="flex justify-start items-start gap-3 flex-wrap">
        {Object.entries(normalizedWords).map(([key, words]: [key: string, words: Word[]]) => {
          const amountOfWords = words.length

          if (!amountOfWords) {
            return null
          }

          return (
            <WordsContainer
              key={key}
              letter={key}
              amountOfWords={amountOfWords}
              words={words}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Words