import React from "react";
import { useSelector } from "react-redux";

import WordsContainer from "common/word-container/WordsContainer";
import { useWords } from "pages/library/hooks/useWords";
import { WordsLayout } from "pages/library/partials/WordsLayout";
import { getUserID } from "services/user/User.store";
import { getWords } from "services/library/Library.store";

import type { Word } from "models/Library.models";

const Words = () => {
  const words = useSelector(getWords);
  const userID = useSelector(getUserID);

  const { normalizedWords, handleClickPin, handleSubmitUpdate, isLoadingUpdate } = useWords({ words });

  if (!normalizedWords.length) {
    return null;
  }

  const title = `Library(${words.length})`;

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
              onClickPin={handleClickPin}
              key={key}
              userID={userID}
              letter={key}
              amountOfWords={amountOfWords}
              words={words}
              isLoadingUpdate={!!isLoadingUpdate}
            />
          );
        })}
      </WordsLayout>
    </React.Fragment>
  );
};

export default Words;
