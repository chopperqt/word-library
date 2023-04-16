import {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getLibraryPinWords, getLibraryWords, getLibraryWordsByPagination } from "api/library.api";
import { usePagination } from "helpers/usePagination";
import { getAmountOfPages } from "services/pagination/Pagination.store";

import type { UserID } from "models/Auth.models";
import type { Word } from "models/Library.models";

interface UseLibraryProps {
  userID: UserID;
  words: Word[];
  isFetched?: boolean;
  isLoading?: boolean;
}
const useLibrary = ({ userID, words }: UseLibraryProps) => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const currentPage = searchParams.get("page");

  const page = currentPage ? +currentPage : 1;
  const amountOfPages = useSelector(getAmountOfPages);
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const { from, to, isLastPage } = usePagination({
    page,
    amountOfPages,
  });

  useEffect(() => {
    window.document.title = "Library";

    getLibraryPinWords(userID);

    if (!words.length) {
      getLibraryWords({
        userID, 
        from: 0, 
        to
      });

      return;
    }

    getLibraryWords({
      userID, 
      from, 
      to
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

  const handleSetPage = () => {
    searchParams.set("page", (+page + 1).toString());

    navigate(`${pathname}?${searchParams.toString()}`);
  }

  const handleGetMoreWords = useCallback(() => {
    handleSetPage()

    getLibraryWordsByPagination({
      userID, 
      from,
      to,
    })
  }, [currentPage])

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
