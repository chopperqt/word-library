import { signIn } from "api/auth.api"
import { useDispatch } from "react-redux"
import { setUser } from "services/user/User.store"

import type { SignInField } from "models/Auth.models"
import { FormInstance } from "antd"
import { useMessage } from "helpers/useMessage"
import { useState } from "react"

const SUCCESS_TEXT = 'Logged success.'

interface UseSignInProps {
  form: FormInstance<any>
}

const useSignIn = ({
  form,
}:UseSignInProps) => {
  const { 
    contextHolder, 
    handleShowSuccess, 
  } = useMessage()

  const dispatch = useDispatch()

  const [isDisabled, setDisabled] = useState(false)
 
  const handleError = () => {
    form.setFields([
      {
        name: 'password',
        errors: ['Invalid login credentials'],
        value: '',
      }

    ])
  }

  const handleSubmit = async (data: SignInField) => {
    const user = await signIn(data)

    if (!user) {
      handleError()

      return 
    }

    setDisabled(true)
    handleShowSuccess(SUCCESS_TEXT)

    setTimeout(() => {
      dispatch(setUser(user))
    }, 2000)
  }

  return {
    contextHolder,
    handleSubmit,
    isDisabled,
  }
}

export default useSignIn