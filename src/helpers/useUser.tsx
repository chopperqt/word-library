import supabase from "api/client"

export const useUser = () => {
  const hasUser = !!supabase.auth.user()

  let user: any | undefined

  if (hasUser) {
    const {
      role = '',
      email = '',
      id = '',
      user_metadata,
    } = supabase.auth.user() || {}
    const {
      avatar_url,
    } = user_metadata || {}

    user = {
      role,
      email,
      id,
      avatar_url,
    }
  }

  return {
    user
  }
}
