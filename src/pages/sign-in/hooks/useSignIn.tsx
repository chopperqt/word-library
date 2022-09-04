import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import type { SignInField } from "models/SignIn.models"
import { signIn } from "api/auth.api"
import { useUser } from "helpers/useUser"

const useSignIn = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const {
    control,
    handleSubmit: submitForm,
  } = useForm<SignInField>()

  const handleSubmit = submitForm(async (data: SignInField) => {
    signIn(data)
    console.log(data)
  })

  useEffect(() => {
    if (user) {
      navigate('/library')
    }
  }, [])

  return {
    control,
    handleSubmit,
  }
}

export default useSignIn