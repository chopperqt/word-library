import React from "react";
import { useSelector } from "react-redux";

import WordsContainer from "common/word-container/WordsContainer";
import { useWords } from "pages/library/hooks/useWords";
import { WordsLayout } from "pages/library/partials/WordsLayout";
import { getAmountOfWords, getWords } from "services/library/Library.store";

import type { Word } from "models/Library.models";
import type { LibraryProps } from "pages/library/Library";

type WordsProps = LibraryProps;

const Words = ({ width, height }: WordsProps) => {
  const words = useSelector(getWords);
  const amountOfWords = useSelector(getAmountOfWords);

  const {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    handleDeleteWord,
    isLoadingUpdate,
    isLoadingDelete,
    isDisabledPin,
  } = useWords({ words });

  if (!normalizedWords.length) {
    return null;
  }

  const title = `Library(${words.length}/${amountOfWords})`;

  return (
    <React.Fragment>
      <div className="text-2xl mt-5 font-bold">{title}</div>
      <WordsLayout>
        {normalizedWords.map(([key, words]: [key: string, words: Word[]]) => {
          const amountOfWords = words.length;

          if (!amountOfWords) {
            return null;
          }

          return (
            <WordsContainer
              onSubmitUpdate={handleSubmitUpdate}
              onClickDelete={handleDeleteWord}
              onClickPin={handleClickPin}
              key={key}
              amountOfWords={amountOfWords}
              letter={key}
              isLoadingUpdate={!!isLoadingUpdate}
              words={words}
              isDisabledPin={isDisabledPin}
              isLoadingDelete={!!isLoadingDelete}
            />
          );
        })}
      </WordsLayout>
    </React.Fragment>
  );
};

export default Words;
