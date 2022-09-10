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
  [key in Requests]: Partial<Statuses>
}

const initialState: Partial<Loading> = {}

const LoadingStore = createSlice({
  name: 'LoadingStore',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<StatusesPayload>) => {
      const {
        name,
        isError,
        isFetched,
        isLoading,
      } = action.payload

      state[name] = {
        ...state[name],
        isLoading: isLoading || state[name]?.isLoading,
        isFetched: isFetched || state[name]?.isFetched,
        isError: isError || state[name]?.isError,
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
