import supabase from "api/client"
import type { UserData } from "models/Auth.models"

export const useUser = (): UserData | null => {
  const user = supabase?.auth?.user()

  if (!user || !user?.id || !user?.role || !user?.email) {
    return null
  }

  const {
    role,
    email,
    id,
    user_metadata: {
      avatar_url,
    },
  } = user

  return {
    role,
    email,
    id,
    avatarUrl: avatar_url,
  }
}
