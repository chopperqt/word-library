import {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getLibraryPinWords, getLibraryWords } from "api/library.api";
import { usePagination } from "helpers/usePagination";
import {
  getAmountOfPages,
  getPage,
  handleIncreasePage,
} from "services/pagination/Pagination.store";

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

  const pageFromStore = useSelector(getPage);
  const page = currentPage ? +currentPage : pageFromStore;
  const amountOfPages = useSelector(getAmountOfPages);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const { from, to, isLastPage } = usePagination({
    page,
    amountOfPages,
  });

  useEffect(() => {
    // if (currentPage && +currentPage === page) {
    //   return;
    // }
    // searchParams.set("page", page.toString());
    // navigate(`${pathname}?${searchParams.toString()}`);
    // getLibraryPinWords(userID);
    // if (!words.length) {
    //   getLibraryWords(userID, 0, to);
    //   return;
    // }
    // getLibraryWords(userID, from, to);
  }, [page]);

  useLayoutEffect(() => {
    window.document.title = "Library";

    if (!words.length) {
      getLibraryWords(userID, 0, to);

      return;
    }

    getLibraryWords(userID, from, to);
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
    dispatch(handleIncreasePage());
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
