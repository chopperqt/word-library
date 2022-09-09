import { configureStore } from '@reduxjs/toolkit'

import LibraryStore from './library/Library.store'
import UserStore from './user/User.store'
import LoadingStore from './loading/Loading.store'

export const store = configureStore({
  reducer: {
    LibraryStore,
    UserStore,
    LoadingStore,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch