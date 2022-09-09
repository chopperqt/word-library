import { useForm } from "react-hook-form"

import type { SignInField } from "models/Auth.models"
import { signIn } from "api/auth.api"
import { useDispatch } from "react-redux"
import { setUser } from "services/user/User.store"
import { WRONG_AUTH_TEXT } from "helpers/texts"

const useSignIn = () => {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit: submitForm,
    setError,
    reset,
  } = useForm<SignInField>()

  const handleSubmit = submitForm(async (data: SignInField) => {
    const user = await signIn(data)

    if (!user) {
      reset()

      setError('password', {
        message: WRONG_AUTH_TEXT,
      })

      return
    }

    dispatch(setUser(user))
  })

  return {
    control,
    handleSubmit,
  }
}

export default useSignIn