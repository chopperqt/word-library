import { useSelector } from "react-redux";

import WordsContainer from "common/word-container/WordsContainer";
import normalizeWords from "../../../helpers/normalizeWords";
import type { Word } from "models/Library.models";
import {
  getPinWords,
  getWords,
} from "services/library/Library.store";
import { getUserID } from "services/user/User.store";
import React from "react";

const Words = () => {
  const userID = useSelector(getUserID)
  const words = useSelector(getWords)
  const pinedWords = useSelector(getPinWords)
  const normalizedWords = normalizeWords(words)
  const normalizedPinedWords = normalizeWords(pinedWords)
  const formattedLibrary = `Library(${words.length})`

  const formattedPined = pinedWords.length
    ? `Pined(${pinedWords.length})`
    : 'Pined'

  return (
    <div className="flex flex-col items-start gap-3 flex-wrap">

      {!!pinedWords.length && (
        <React.Fragment>
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
                  userID={userID}
                  letter={key}
                  amountOfWords={amountOfWords}
                  words={words}
                  color="bg-indigo-700"
                />
              )
            })}
          </div>
        </React.Fragment>
      )}
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
              userID={userID}
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