import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import type { SignInField } from "models/Auth.models"
import { signIn } from "api/auth.api"
import { useDispatch, useSelector } from "react-redux"
import { getUserID, setUser } from "services/user/User.store"

const useSignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userID = useSelector(getUserID)
  const {
    control,
    handleSubmit: submitForm,
  } = useForm<SignInField>()

  const handleSubmit = submitForm(async (data: SignInField) => {
    const user = await signIn(data)

    if (!user) {
      return
    }

    dispatch(setUser(user))
  })

  useEffect(() => {
    if (userID) {
      navigate('/library')

      return
    }

    // navigate('/signIn')
  }, [
    userID,
    navigate,
  ])

  return {
    control,
    handleSubmit,
  }
}

export default useSignIn