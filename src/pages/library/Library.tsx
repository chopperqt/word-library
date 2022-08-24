import normalizeWords from "../../helpers/normalizeWords";
import { wordsMock } from "../../mockData"
import type { Word } from "../../mockData";


const Library = () => {

  const normalizedWords = normalizeWords(wordsMock)

  return (
    <div className="flex justify-start gap-3 flex-wrap p-5 ">
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
            <div className="text-lg px-5 py-1 bg-sky-300 rounded-t-md">
              <div className="flex gap-1 justify-center color text-white">
                <div>{key.toUpperCase()}</div>
                <div>({amountOfWords})</div>
              </div>
            </div>
            <div className="mt-1 h-0.5 w-full bg-gray-50" />
            <div className="px-5 py-1 rounded-b-md">
              {words.map(({
                english,
                russia,
                id,
              }) => (
                <div>
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

export default Library