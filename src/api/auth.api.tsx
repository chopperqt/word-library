import { ApiError } from "@supabase/supabase-js"
import { User } from "models/Auth.models"
import { useDispatch } from "react-redux"
import { setUser } from "services/user/User.store"
import supabase from "./client"
export type AuthRequests =
  'loginWithGoogle' |
  'signUp' |
  'validateEmail' |
  'deleteUser' |
  'login' |
  'getUser'

export type UserEmail = string
export type UserID = string
export type UserPassword = string

export interface LoginData {
  login: string
  password: string
}

// // FIXED добавить какие данные будут в дате при регистрации
// export interface SignUpData extends LoginData {
//   data: any
// }

// export const signInWithGoogle = async () => {
//   const {
//     handleFailure,
//     handlePending,
//     handleSuccess,
//   } = loadingStatuses('loginWithGoogle')

//   handlePending()

//   const { error } = await supabase.auth.signIn({
//     provider: 'google',
//   })

//   if (error) {
//     handleFailure(error.message)
//   }

//   handleSuccess()
// }

export const signIn = async ({
  login,
  password,
}: LoginData): Promise<User | null> => {
  const {
    error,
    user,
  } = await supabase
    .auth
    .signIn({
      email: login,
      password,
    })

  if (error || !user || !user?.id || !user?.email || !user?.role) {
    return null
  }

  const {
    id,
    role,
    email,
    user_metadata,
  } = user

  return {
    id,
    role,
    email,
    avatarUrl: user_metadata?.avatar_url || '',
  }
}

export const logOut = async (): Promise<ApiError | null> => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return error
  }

  return null
}

// export const signUp = async ({
//   email,
//   password,
//   data,
// }: SignUpData): Promise<boolean> => {
//   const {
//     handleFailure,
//     handlePending,
//     handleSuccess
//   } = loadingStatuses('signUp')

//   handlePending()

//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//   }, {
//     data,
//   })

//   if (error) {
//     handleFailure(error.message)

//     return false
//   }

//   handleSuccess(signUpSuccess)

//   return true
// }

// export const deleteUser = async (id: UserID) => {
//   const {
//     handleFailure,
//     handlePending,
//     handleSuccess,
//   } = loadingStatuses('deleteUser')

//   handlePending()

//   const {
//     data: user,
//     error,
//   } = await supabase.auth.api.deleteUser(id)

//   if (error) {
//     handleFailure(error.message)
//   }

//   console.log(user)

//   handleSuccess()
// }

// export const validateEmail = debounce(async (email: UserEmail): Promise<any[]> => {
//   const {
//     handleFailure,
//     handlePending,
//     handleSuccess,
//   } = loadingStatuses('validateEmail')

//   handlePending()

//   const { data, error } = await supabase
//     .from(Tables.users)
//     .select('email')
//     .like('email', email)

//   if (error) {
//     handleFailure(error.message)

//     return []
//   }

//   handleSuccess()

//   return data
// })

// export const getUser = async (token: string) => {
//   const {
//     handleFailure,
//     handlePending,
//     handleSuccess,
//   } = loadingStatuses('getUser')

//   handlePending()

//   const {
//     user,
//     error,
//   } = await supabase.auth.api.getUser(token)

//   if (error) {
//     handleFailure(error.message)

//     return
//   }

//   handleSuccess()
// }