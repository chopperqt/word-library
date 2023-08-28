import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { useSelector } from "react-redux";

import { bc } from "App";
import {
  getLibraryPinWords,
  getWords,
  getWordsByPagination,
} from "api/library.api";
import { usePagination } from "helpers/usePagination";
import { getAmountOfPages } from "services/pagination/Pagination.store";
import { ParamsController } from "helpers/paramsController";

import type { WordApi } from "models/Library.models";

interface UseLibraryProps {
  userID: string;
  words: WordApi[];
  isFetched?: boolean;
  isLoading?: boolean;
}
const useLibrary = ({ userID, words, isFetched }: UseLibraryProps) => {
  const { setParam, getParam } = ParamsController();

  const pageParam = getParam("page");

  const currentPage = pageParam ? +pageParam : 1;
  const amountOfPages = useSelector(getAmountOfPages);

  const [value, setValue] = useState<string>("");

  const { isLastPage } = usePagination({
    page: currentPage,
    amountOfPages,
  });

  useEffect(() => {
    getLibraryPinWords(userID);
    getWords({ userID, page: currentPage });
  }, []);

  const wordsSearched = useMemo(() => {
    if (value.length < 2) {
      return;
    }

    return words.filter(({ word, translate }) => {
      const formattedWord = (word + translate.join(""))
        .toLowerCase()
        .replaceAll(" ", "");
      const formattedValue = value.toLowerCase().replaceAll(" ", "");

      return formattedWord.includes(formattedValue);
    });
  }, [value, words]);

  const isNothingFound = useMemo(() => {
    return (
      wordsSearched?.length === 0 && value.length !== 0 && value.length > 2
    );
  }, [wordsSearched, value]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleGetMoreWords = () => {
    const nextPage = currentPage + 1;

    bc.postMessage({
      page: nextPage,
    });

    setParam("page", nextPage.toString());

    getWordsByPagination({
      userID,
      page: nextPage,
    });
  };

  return {
    value,
    handleChangeValue,
    wordsSearched,
    isNothingFound,
    handleGetMoreWords,
    isLastPage,
  };
};

export default useLibrary;
