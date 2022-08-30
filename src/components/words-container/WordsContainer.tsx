import Edit from './partials/Edit'
import Pined from './partials/Pined'

import type { Word } from '../../mockData'

interface WordsContainerProps {
  amountOfWords: number
  words: Word[]
  letter: string
  color?: string
}
const WordsContainer = ({
  amountOfWords,
  words = [],
  letter,
  color = 'bg-sky-700',
}: WordsContainerProps) => (
  <div className="flex flex-col bg-white">
    <div className={`text-lg px-5 py-1 ${color} rounded-t-md`}>
      <div className="flex gap-1 justify-center color text-white">
        <div>{letter.toUpperCase()}</div>
        <div>({amountOfWords})</div>
      </div>
    </div>
    <div className="h-0.5 w-full bg-gray-50" />
    <div className="px-5 py-1 rounded-b-md">
      {words.map(({
        english,
        russia,
        id,
        pined,
      }) => (
        <div
          key={id}
          className="flex items-center"
        >
          <Pined isPined={pined} />
          <Edit />
          <div>
            {english}
          </div>
          <div>&nbsp;—&nbsp;</div>
          <div className="flex">
            {russia[0]}
            <div>
              {russia.length > 1 && (
                <div>&nbsp;+{russia.length - 1}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default WordsContainer