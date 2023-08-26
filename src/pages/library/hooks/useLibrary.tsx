import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { useSelector } from "react-redux";

import { bc } from "App";
import {
  getLibraryPinWords,
  getLibraryWords,
  getLibraryWordsByPagination,
} from "api/library.api";
import { usePagination } from "helpers/usePagination";
import { getAmountOfPages } from "services/pagination/Pagination.store";
import { getPaginationRange } from "helpers/getPaginationRange";
import { ParamsController } from "helpers/paramsController";

import type { UserID } from "models/Auth.models";
import type { WordApi } from "models/Library.models";

interface UseLibraryProps {
  userID: UserID;
  words: WordApi[];
  isFetched?: boolean;
  isLoading?: boolean;
}
const useLibrary = ({ userID, words, isFetched }: UseLibraryProps) => {
  const { setParam, getParam } = ParamsController();

  const pageParam = getParam("page");

  const page = pageParam || 1;
  const amountOfPages = useSelector(getAmountOfPages);

  const [value, setValue] = useState<string>("");

  const { from, to, isLastPage } = usePagination({
    page: +page,
    amountOfPages,
  });

  useEffect(() => {
    getLibraryPinWords(userID);
  }, []);

  useEffect(() => {
    if (!words.length) {
      getLibraryWords({
        userID,
        from: 0,
        to,
      });

      return;
    }

    getLibraryWords({
      userID,
      from,
      to,
    });
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
    const nextPage = +page + 1;

    const { from, to } = getPaginationRange(nextPage);

    bc.postMessage({
      page: nextPage,
    });

    setParam("page", nextPage.toString());

    getLibraryWordsByPagination({
      userID,
      from,
      to,
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
