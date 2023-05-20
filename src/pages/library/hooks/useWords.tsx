import { useSelector } from "react-redux";
import { useMemo } from "react";

import { normalizeWords } from "helpers/normalizeWords";
import {
  deleteLibraryWords,
  getLibraryPinWords,
  getLibraryWords,
  getLibraryWordsWithoutLoading,
  updateLibraryWord,
  updatePin,
} from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";
import { getLoading } from "services/loading/Loading.store";
import { getAmountOfPages } from "services/pagination/Pagination.store";
import { usePagination } from "helpers/usePagination";
import { getPinWords } from "services/library/Library.store";

import type { Word, WordForm } from "models/Library.models";
import { ParamsController } from "helpers/paramsController";
import { useMessage } from "helpers/useMessage";
import { log } from "console";

interface UseWordsProps {
  words: Word[];
}

export const useWords = ({ words = [] }: UseWordsProps) => {
  const { getParam } = ParamsController();

  const page = getParam("page") || 1;

  const userID = useSelector(getUserID);
  const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading;
  const isLoadingDelete = useSelector(getLoading).deleteLibraryWords?.isLoading;
  const amountOfPages = useSelector(getAmountOfPages);
  const pinedWords = useSelector(getPinWords);

  const { messageApi, contextHolder, handleShowSuccess } = useMessage();

  const isDisabledPin = useMemo(() => {
    return pinedWords.length >= 15;
  }, [pinedWords]);

  const { to } = usePagination({
    page: +page,
    amountOfPages,
  });

  const normalizedWords = useMemo(() => {
    let formattedWords = words;

    return Object.entries(normalizeWords(formattedWords));
  }, [words]);

  const handleClickPin = async (word: string, isPined: boolean) => {
    let successText = (
      <span>
        <b>{word}</b> pined.
      </span>
    );
    let content = `Pinning...`;

    if (isPined) {
      successText = (
        <span>
          <b>{word}</b> unpined.
        </span>
      );
      content = `Unpinning...`;
    }

    messageApi
      .open({
        type: "loading",
        content,
      })
      .then(async () => {
        const response = await updatePin(userID, !isPined, word);

        if (response === null) {
          return;
        }

        handleShowSuccess(successText);

        getLibraryPinWords(userID);
        getLibraryWordsWithoutLoading({
          userID,
          from: 0,
          to,
        });
      });
  };

  const handleSubmitUpdate = async (
    word: WordForm,
    wordID?: number
  ): Promise<Word[] | null> => {
    if (!wordID) {
      return null;
    }

    const normalizedWord = getNormalizeWord(word);

    const response = await updateLibraryWord({
      ...normalizedWord,
      wordID,
      userID,
    });

    if (response === null) {
      return null;
    }

    getLibraryPinWords(userID);
    getLibraryWordsWithoutLoading({
      userID,
      from: 0,
      to,
    });

    handleShowSuccess(
      <span>
        <b>{word.word}</b> updated.
      </span>
    );

    return response;
  };

  const handleClickDelete = async (word: string): Promise<Word[] | null> => {
    const response = await deleteLibraryWords(userID, word);

    if (!response) {
      return null;
    }

    getLibraryWordsWithoutLoading({
      userID,
      from: 0,
      to,
    });
    getLibraryPinWords(userID);

    handleShowSuccess(
      <span>
        <b>{word}</b> deleted.
      </span>
    );

    return response as Word[];
  };

  return {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    isLoadingUpdate,
    isLoadingDelete,
    isDisabledPin,
    userID,
    contextHolder,
  };
};
