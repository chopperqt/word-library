import React from "react";
import { useSelector } from "react-redux";

import WordsContainer from "common/word-container/WordsContainer";
import { useWords } from "pages/library/hooks/useWords";
import ResetPin from "pages/library/partials/ResetPin";
import { getPinWords } from "services/library/Library.store";
import { getUserID } from "services/user/User.store";

const WordsPined = () => {
  const words = useSelector(getPinWords);
  const userID = useSelector(getUserID);

  const { normalizedWords } = useWords({ words });

  if (!words.length) {
    return null;
  }

  const title = `Pined(${words.length})`;

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

            console.log("i am here", words);

            return (
              <WordsContainer
                key={key}
                userID={userID}
                letter={key}
                amountOfWords={amountOfWords}
                words={words}
                color="bg-indigo-700"
              />
            );
          }
        )}
      </div>
    </React.Fragment>
  );
};

export default WordsPined;
