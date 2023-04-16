import { useSelector } from "react-redux";

import {
  createLibraryWord,
  getLibraryPinWords,
  getLibraryWords,
} from "api/library.api";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";
import { getUserID } from "services/user/User.store";
import { getLoading } from "services/loading/Loading.store";
import { getOnlyWords, getPinWords } from "services/library/Library.store";
import { usePagination } from "helpers/usePagination";
import {
  getAmountOfPages,
  getPage,
} from "services/pagination/Pagination.store";

import type { Word, WordForm } from "models/Library.models";
import { useMemo } from "react";
import { message } from "antd";
import { useLocation } from "react-router-dom";

const useCreateWord = () => {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const currentPage = searchParams.get("page")

  const userID = useSelector(getUserID);
  const isLoading = useSelector(getLoading).createLibraryWord?.isLoading;
  const words = useSelector(getOnlyWords);
  const amountOfPages = useSelector(getAmountOfPages);
  const pinedWords = useSelector(getPinWords);

  const page = currentPage ?  +currentPage : 1

  const [messageApi, contextHolder] = message.useMessage();

  const { to } = usePagination({
    page,
    amountOfPages,
  });

  const isDisabledPin = useMemo(() => {
    if (pinedWords.length >= 15) {
      return true;
    }

    return false;
  }, [pinedWords]);

  const handleErrorMessage = () => {
    messageApi.error({
      type: "error",
      content: "Something wend wrong!",
    });
  };

  const handleSuccessMessage = (word: string) => {
    messageApi.success({
      type: "success",
      content: `${word}, create success.`
    })
  }

  const onSubmit = async (data: WordForm): Promise<Word[] | null> => {
    if (!userID) {
      return null;
    }

    const normalizedWord = getNormalizeWord(data);

    const response = await createLibraryWord({
      ...normalizedWord,
      userID,
    });

    if (response === null) {
      handleErrorMessage();

      return null;
    }

    getLibraryPinWords(userID);
    getLibraryWords({
      userID, 
      from: 0, 
      to
    });
    handleSuccessMessage(normalizedWord.word)

    return response;
  };

  return {
    contextHolder,
    onSubmit,
    words,
    isLoading,
    userID,
    isDisabledPin,
  };
};

export default useCreateWord;
