import { createSlice, createSelector } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "services/stores";
import type { Word } from "models/Library.models";

export interface Library {
  words: Word[];
  pinedWords: Word[];
  amountOfWords: number;
}

const initialState: Library = {
  words: [],
  pinedWords: [],
  amountOfWords: 0,
};

const LibraryStore = createSlice({
  name: "LibraryStore",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload;
    },
    setPinedWords: (state, action: PayloadAction<Word[]>) => {
      state.pinedWords = action.payload;
    },
    setAmountOfWords: (state, action: PayloadAction<number>) => {
      state.amountOfWords = action.payload;
    },
    updateWords: (state, action: PayloadAction<Word[]>) => {
      state.words = [...state.words, ...action.payload];
    },
  },
});

export const { setWords, setPinedWords, updateWords, setAmountOfWords } =
  LibraryStore.actions;

export const getWords = createSelector(
  (state: RootState) => state.LibraryStore.words,
  (words) => words
);

export const getPinWords = createSelector(
  (state: RootState) => state.LibraryStore.pinedWords,
  (words) => words
);

export const getOnlyWords = createSelector(
  (state: RootState) => state.LibraryStore.words,
  (words) => {
    return words.map(({ word }) => word);
  }
);

export const getAmountOfWords = createSelector(
  (state: RootState) => state.LibraryStore.amountOfWords,
  (amountOfWords) => amountOfWords
);

export default LibraryStore.reducer;
