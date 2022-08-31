import { configureStore } from '@reduxjs/toolkit'

import LibraryStore from './library/Library.store'

export const store = configureStore({
  reducer: {
    LibraryStore,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch