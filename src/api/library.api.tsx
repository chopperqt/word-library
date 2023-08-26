import { debounce } from "lodash-es";

import supabase from "./client";
import {
  WordCreateApi,
  WordUpdateApi,
  WordApi,
  WordSchema,
} from "models/Library.models";
import { store } from "services/stores";
import {
  setAmountOfWords,
  setPinedWords,
  setWords,
  updateWords,
} from "services/library/Library.store";
import { loadingController } from "helpers/loadingController";
import { setAmountOfPages } from "services/pagination/Pagination.store";
import { setSearchWords } from "services/search/Search.store";
import { parse } from "valibot";

const LIBRARY_TABLE = "library";

export type LibraryRequests =
  | "createLibraryWord"
  | "getLibraryWords"
  | "updateLibraryWord"
  | "updatePin"
  | "deleteLibraryWords"
  | "searchWord"
  | "getLibraryPinWords"
  | "getLibraryWordsByPagination"
  | "getLibraryWordsWithoutLoading";

export const createLibraryWord = async (
  wordData: WordCreateApi
): Promise<WordApi[] | null> => {
  const { handleSetError, handleSetPending, handleSetSuccess } =
    loadingController("createLibraryWord");

  handleSetPending();

  const { data, error } = await supabase.from(LIBRARY_TABLE).insert(wordData);

  if (error || !data) {
    handleSetError();

    return null;
  }

  handleSetSuccess();

  return data;
};

export const updateLibraryWord = async (
  wordData: WordUpdateApi
): Promise<WordApi[] | null> => {
  const { handleSetError, handleSetPending, handleSetSuccess } =
    loadingController("updateLibraryWord");

  handleSetPending();

  const { pined, translate, word, userID, wordID } = wordData;

  const { data, error } = await supabase
    .from(LIBRARY_TABLE)
    .update({
      pined,
      translate,
      word,
    })
    .match({
      userID,
      id: wordID,
    });

  if (error || !data) {
    handleSetError();

    return null;
  }

  handleSetSuccess();

  return data;
};

interface GetWords {
  userID: string;
  from?: number;
  to?: number;
}

export const getWords =
  (controller: LibraryRequests) =>
  async ({
    userID,
    from = 0,
    to = 70,
  }: GetWords): Promise<WordApi[] | null> => {
    const { handleSetError, handleSetPending, handleSetSuccess } =
      loadingController(controller);

    handleSetPending();

    const { data, error, count } = await supabase
      .from(LIBRARY_TABLE)
      .select("*", { count: "exact" })
      .match({ userID })
      .order("word")
      .range(from, to);

    if (error || !data || !count) {
      handleSetError();

      return null;
    }

    try {
      const normalizedData = data.map((item) => parse(WordSchema, item));

      const amountOfPages = Math.round(count / 70);

      if (from === 0) {
        store.dispatch(setWords(normalizedData));
      } else {
        store.dispatch(updateWords(normalizedData));
      }

      store.dispatch(setAmountOfWords(count));
      store.dispatch(setAmountOfPages(amountOfPages));

      handleSetSuccess();

      return normalizedData;
    } catch (e) {
      return null;
    }
  };

export const getLibraryPinWords = async (
  userID: string
): Promise<WordApi[] | null> => {
  const { handleSetError, handleSetPending, handleSetSuccess } =
    loadingController("getLibraryPinWords");

  handleSetPending();

  const { data, error } = await supabase
    .from(LIBRARY_TABLE)
    .select("*")
    .limit(15)
    .match({
      userID,
      pined: true,
    });

  if (error) {
    handleSetError();

    return null;
  }

  store.dispatch(setPinedWords(data));

  handleSetSuccess();

  return data;
};

export const deleteLibraryWords = async (userID: string, word: string) => {
  const { handleSetError, handleSetPending, handleSetSuccess } =
    loadingController("deleteLibraryWords");

  handleSetPending();

  const { data, error } = await supabase.from(LIBRARY_TABLE).delete().match({
    userID,
    word,
  });

  if (error || !data) {
    handleSetError();

    return;
  }

  handleSetSuccess();

  // TODO нужно посмотреть что вернут запрос и добавить тип который возвращает фукнция
  return data;
};

export const updatePin = async (
  userID: string,
  pined: boolean,
  word: string
): Promise<WordApi[] | null> => {
  const { handleSetError, handleSetPending, handleSetSuccess } =
    loadingController("updatePin");

  handleSetPending();

  const { data, error } = await supabase
    .from(LIBRARY_TABLE)
    .update({
      pined,
    })
    .match({
      userID,
      word,
    });

  if (error) {
    handleSetError();

    return null;
  }

  handleSetSuccess();

  return data;
};

export const searchWord = debounce(
  async (userID: string, word: string): Promise<WordApi[] | null> => {
    const { handleSetError, handleSetPending, handleSetSuccess } =
      loadingController("searchWord");

    handleSetPending();

    const { data, error } = await supabase
      .from(LIBRARY_TABLE)
      .select("*")
      .match({ userID })
      .textSearch("word", word);

    if (error) {
      handleSetError();

      return null;
    }

    store.dispatch(setSearchWords(data));

    handleSetSuccess();

    return data;
  },
  600
);

export const getLibraryWords = getWords("getLibraryWords");

export const getLibraryWordsByPagination = getWords(
  "getLibraryWordsByPagination"
);

export const getLibraryWordsWithoutLoading = getWords(
  "getLibraryWordsWithoutLoading"
);
