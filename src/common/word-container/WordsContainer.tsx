import Edit from './components/editWord/EditWord'
import Pined from './partials/Pined'
import Delete from './partials/Delete'
import ExtraWords from './partials/ExtraWords'

import type { Word, WordForm } from 'models/Library.models'
import type { UserID } from 'models/Auth.models'

interface WordsContainerProps {
  amountOfWords: number
  words: Word[]
  letter: string
  color?: string
  userID: UserID
  onClickPin: (word: string, isPined: boolean) => void
  onSubmitUpdate: (word: WordForm, wordID?: number) => Promise<Word[] | null>
  onClickDelete: (word: string) => Promise<Word[] | null>
  isLoadingUpdate: boolean
  isLoadingDelete: boolean
}
const WordsContainer = ({
  amountOfWords,
  words = [],
  letter,
  color = 'bg-sky-700',
  userID,
  onClickPin,
  onSubmitUpdate,
  onClickDelete,
  isLoadingUpdate = false,
  isLoadingDelete = false,
}: WordsContainerProps) => {
  if (!words.length) {
    return null
  }

  return (
    <div className="flex flex-col bg-white rounded-b-md shadow-md mb-3 break-inside-avoid-column">
      <div className={`text-lg px-5 py-1 ${color} rounded-t-md`}>
        <div className="flex gap-1 justify-center color text-white">
          <div>{letter.toUpperCase()}</div>
          <div>({amountOfWords})</div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gray-50" />
      <div className="px-5 py-1">
        {words.map((word) => {
          const {
            word: wordName,
            translate,
            id,
            pined,
          } = word

          return (
          <div
            key={id}
            className="flex items-center"
          >
            <Pined
              onClick={() => onClickPin(wordName, pined)}
              isPined={pined}
            />
            <Edit
              onSubmit={onSubmitUpdate}
              wordID={id}
              word={wordName}
              translate={translate}
              pined={pined}
              isLoading={isLoadingUpdate}
            />
            <Delete
              onClick={() => onClickDelete(wordName)}
              isLoading={isLoadingDelete}
            />
            <div>
              {wordName}
            </div>
            <div>&nbsp;—&nbsp;</div>
            <div className="flex">
              {!!translate?.[0] && translate[0]}
              {translate?.length > 1 && (
                <ExtraWords words={translate} />
              )}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default WordsContainer