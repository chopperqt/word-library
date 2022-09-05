import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'services/stores'
import type { User } from 'models/Auth.models'

const initialState: User = {
  id: '',
  role: '',
  email: '',
  avatarUrl: '',
}

const UserStore = createSlice({
  name: 'UserStore',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const {
        id,
        email,
        role,
        avatarUrl,
      } = action.payload

      state.avatarUrl = avatarUrl
      state.email = email
      state.role = role
      state.id = id
    },
    clearUser: (state) => {
      state.avatarUrl = ''
      state.email = ''
      state.role = ''
      state.id = ''
    }
  }
})

export const {
  setUser,
  clearUser,
} = UserStore.actions

export const getUser = createSelector(
  (state: RootState) => state.UserStore,
  (user) => user
)

export const getUserID = createSelector(
  (state: RootState) => state.UserStore,
  (user) => user.id
)



export default UserStore.reducer

