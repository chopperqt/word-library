export type UserID = UserApi['id']

export interface UserApi {
  user_metadata: {
    avatar_url: string
  },
  email: string
  id: string
  role: string
}

export interface UserData {
  avatarUrl: string
  email: string
  id: UserID
  role: string
}

export interface SignInField {
  login: string
  password: string
}