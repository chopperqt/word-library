import normalizeWords from "../../../helpers/normalizeWords";
import type { Word } from "../../../mockData";

interface WordsProps {
  words: Word[]
}
const Words = ({
  words
}: WordsProps) => {
  const normalizedWords = normalizeWords(words)

  return (
    <div className="flex justify-start items-start gap-3 flex-wrap">
      {Object.entries(normalizedWords).map(([key, words]: [key: string, words: Word[]]) => {
        const amountOfWords = words.length

        if (!amountOfWords) {
          return null
        }

        return (
          <div
            key={key}
            className="flex flex-col bg-white"
          >
            <div className="text-lg px-5 py-1 bg-sky-700 rounded-t-md">
              <div className="flex gap-1 justify-center color text-white">
                <div>{key.toUpperCase()}</div>
                <div>({amountOfWords})</div>
              </div>
            </div>
            <div className="h-0.5 w-full bg-gray-50" />
            <div className="px-5 py-1 rounded-b-md">
              {words.map(({
                english,
                russia,
                id,
              }) => (
                <div key={id}>
                  {english} — {russia}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Words