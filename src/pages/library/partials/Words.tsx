import { useSelector } from "react-redux";

import WordsContainer from "common/word-container/WordsContainer";
import normalizeWords from "../../../helpers/normalizeWords";
import type { Word } from "models/Library.models";
import {
  getPinWords,
  getWords,
} from "services/library/Library.store";
import { getUserID } from "services/user/User.store";
import React, { useMemo } from "react";
import ResetPin from "./ResetPin";
import NothingFound from "./NothingFound";
import useWords from "../hooks/useWords";

interface WordsProps {
  wordsSearched?: Word[]
  isNothingFound: boolean
}
const Words = ({
  wordsSearched = [],
  isNothingFound = false,
}: WordsProps) => {
  const userID = useSelector(getUserID)
  const words = useSelector(getWords)
  const wordsPined = useSelector(getPinWords)
  const normalizedPinedWords = normalizeWords(wordsPined)

  const {
    wordsPinedTitle,
    wordsTitle,
    normalizedWords,
  } = useWords({
    words,
    wordsPined,
    wordsSearched,
  })

  return (
    <div className="flex flex-col items-start gap-3 flex-wrap">
      {!!wordsPined.length && (
        <React.Fragment>
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              {wordsPinedTitle}
            </div>
            <ResetPin />
          </div>
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
      <div className="text-2xl mt-5 font-bold">{wordsTitle}</div>
      <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-2 xl:columns-3 2xl:columns-4 list-none">
        {isNothingFound && (
          <NothingFound />
        )}
        {!isNothingFound && normalizedWords.map(([key, words]: [key: string, words: Word[]]) => {
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