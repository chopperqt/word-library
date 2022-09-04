import Edit from './partials/Edit'
import Pined from './partials/Pined'
import ExtraWords from './partials/ExtraWords'

import type { Word } from 'models/Library.models'

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
        word,
        translate,
        id,
        pined,
      }) => (
        <div
          key={id}
          className="flex items-center"
        >
          <Pined isPined={pined} />
          <Edit
            word={word}
            translate={translate}
            pined={pined}
          />
          <div>
            {word}
          </div>
          <div>&nbsp;—&nbsp;</div>
          <div className="flex">
            {translate[0]}
            {translate.length > 1 && (
              <ExtraWords words={translate} />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default WordsContainer