import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'services/stores'
import type { Word } from 'models/Library.models'

export interface Library {
  words: Word[]
}

const initialState: Library = {
  words: []
}

const LibraryStore = createSlice({
  name: 'LibraryStore',
  initialState,
  reducers: {}
})

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



export default LibraryStore.reducer