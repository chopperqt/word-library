import Edit from './partials/Edit'
import Pined from './partials/Pined'
import ExtraWords from './partials/ExtraWords'

import type { Word } from 'models/Library.models'
import type { UserID } from 'models/Auth.models'
import Delete from './partials/Delete'

interface WordsContainerProps {
  amountOfWords: number
  words: Word[]
  letter: string
  color?: string
  userID: UserID
}
const WordsContainer = ({
  amountOfWords,
  words = [],
  letter,
  color = 'bg-sky-700',
  userID,
}: WordsContainerProps) => (
  <div className="flex flex-col bg-white rounded-b-md shadow-md">
    <div className={`text-lg px-5 py-1 ${color} rounded-t-md`}>
      <div className="flex gap-1 justify-center color text-white">
        <div>{letter.toUpperCase()}</div>
        <div>({amountOfWords})</div>
      </div>
    </div>
    <div className="h-0.5 w-full bg-gray-50" />
    <div className="px-5 py-1">
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
          <Pined
            userID={userID}
            isPined={pined}
            word={word}
          />
          <Edit
            userID={userID}
            wordID={id}
            word={word}
            translate={translate}
            pined={pined}
          />
          <Delete
            userID={userID}
            word={word}
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