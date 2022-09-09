import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'services/stores'
import type {
  Statuses,
  Requests,
  StatusesPayload,
} from 'models/Loading.models'

export type Loading = {
  [key in Requests]: Statuses
}

const initialState: Partial<Loading> = {}

const LoadingStore = createSlice({
  name: 'LoadingStore',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<StatusesPayload>) => {
      const {
        name,
        isError = false,
        isFetched = false,
        isLoading = false,
      } = action.payload

      state[name] = {
        isLoading,
        isFetched,
        isError,
      }
    }
  }
})

export const {
  setLoading,
} = LoadingStore.actions

export const getLoading = createSelector(
  (state: RootState) => state.LoadingStore,
  (loading) => loading
)


export default LoadingStore.reducer
