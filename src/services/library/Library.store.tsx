import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'services/stores'
import type { Word } from 'models/Library.models'

export interface Library {
  words: Word[]
  isLoadingWords: boolean
}

const initialState: Library = {
  words: [],
  isLoadingWords: false
}

const LibraryStore = createSlice({
  name: 'LibraryStore',
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload
    },
    setWordsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingWords = action.payload
    },
  }
})

export const {
  setWordsLoading,
  setWords,
} = LibraryStore.actions

export const getWords = createSelector(
  (state: RootState) => state.LibraryStore.words,
  (words) => words
)

export const getPinWords = createSelector(
  (state: RootState) => state.LibraryStore.words,
  (words) => {
    return words.filter((pined) => pined)
  }
)

export const getWordsLoadingStatus = createSelector(
  (state: RootState) => state.LibraryStore.isLoadingWords,
  (loading) => loading
)

export default LibraryStore.reducer