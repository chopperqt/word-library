import React from "react";
import { useSelector } from "react-redux";

import WordsContainer from "common/word-container/WordsContainer";
import { useWords } from "pages/library/hooks/useWords";
import ResetPin from "pages/library/partials/ResetPin";
import { getPinWords } from "services/library/Library.store";

const WordsPined = () => {
  const words = useSelector(getPinWords)

  const { 
    normalizedWords, 
    handleClickPin, 
    handleDeleteWord, 
    handleSubmitUpdate, 
    isLoadingDelete, 
    isLoadingUpdate,
    isDisabledPin,
  } = useWords({
    words,
  });

  if (!words.length) {
    return null;
  }

  const title = `Pined(${words.length}/15)`;

  return (
    <React.Fragment>
      <div className="flex items-center">
        <div className="text-2xl font-bold">{title}</div>
        <ResetPin />
      </div>
      <div className="flex justify-start items-start gap-3 flex-wrap">
        {Object.entries(normalizedWords).map(
          ([key, words]: [key: string, words: any]) => {
            const amountOfWords = words[1].length;

            if (!amountOfWords) {
              return null;
            }

            const [letter, word ] = words

            return ( 
              <WordsContainer                
                key={key}
                onClickDelete={handleDeleteWord}
                onSubmitUpdate={handleSubmitUpdate}
                onClickPin={handleClickPin}
                letter={letter}
                amountOfWords={amountOfWords}
                words={word}
                color="bg-indigo-700"
                isLoadingDelete={!!isLoadingDelete}
                isLoadingUpdate={!!isLoadingUpdate}
                isDisabledPin={isDisabledPin}
              />
            );
          }
        )}
      </div>
    </React.Fragment>
  );
};

export default WordsPined;
