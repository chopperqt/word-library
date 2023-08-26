import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteLibraryWords,
  getLibraryPinWords,
  getLibraryWords,
  searchWord,
  updateLibraryWord,
  updatePin,
} from "api/library.api";
import { getUserID } from "services/user/User.store";
import { getLoading } from "services/loading/Loading.store";
import { clearSearch, getSearchWords } from "services/search/Search.store";
import { getNormalizeWord } from "common/word-modal/helpers/getNormalizeWord";
import {
  getAmountOfPages,
  getPage,
} from "services/pagination/Pagination.store";
import { usePagination } from "helpers/usePagination";

import type { WordApi, WordForm } from "models/Library.models";

const useSearch = () => {
  const dispatch = useDispatch();

  const userID = useSelector(getUserID);
  const searchWords = useSelector(getSearchWords);
  const isLoading = useSelector(getLoading).searchWord?.isLoading;
  const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading;
  const isLoadingDelete = useSelector(getLoading).deleteLibraryWords?.isLoading;
  const page = useSelector(getPage);
  const amountOfPages = useSelector(getAmountOfPages);

  const [value, setValue] = useState("");

  const { to } = usePagination({
    page,
    amountOfPages,
  });

  const handleChangeValue = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    dispatch(clearSearch());

    if (value.length < 3) {
      return;
    }

    searchWord(userID, value);
  }, [value]);

  const isShowSearchedWord = useMemo(() => {
    if (value.length !== 0 && searchWords.length) {
      return true;
    }

    return false;
  }, [searchWords, value]);

  const handleClickPin = (word: string, isPined: boolean) => {
    const response = updatePin(userID, !isPined, word);

    if (response === null) {
      return;
    }

    getLibraryPinWords(userID);
    getLibraryWords({ userID });
    setValue("");
  };

  const handleSubmitUpdate = async (
    word: WordForm,
    wordID?: number
  ): Promise<WordApi[] | null> => {
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
    getLibraryWords({ userID });
    setValue("");

    return response;
  };

  const handleClickDelete = async (word: string): Promise<WordApi[] | null> => {
    const response = await deleteLibraryWords(userID, word);

    if (response === null) {
      return null;
    }

    getLibraryPinWords(userID);
    getLibraryWords({
      userID,
      from: 0,
      to,
    });
    setValue("");

    return response as WordApi[];
  };

  return {
    searchWords,
    value,
    handleChangeValue,
    isLoading,
    isShowSearchedWord,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    isLoadingDelete,
    isLoadingUpdate,
  };
};

export default useSearch;
