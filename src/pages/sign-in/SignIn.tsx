import { useSelector } from "react-redux"

import TextField from "common/text-field/TextField"
import Button from "components/button/Button"
import useSignIn from "./hooks/useSignIn"
import {
  Fields,
  LINK_TEXT,
  SIGN_IN_TEXT,
  LOGIN_TEXT,
  LINE_STYLES,
} from "./constants"
import Link from "components/link"
import { getLoading } from "services/loading/Loading.store"

const SignIn = () => {
  const isLoading = useSelector(getLoading).signUp?.isLoading
  const {
    handleSubmit,
    control,
  } = useSignIn()

  console.log('isLoading', isLoading)

  return (
    <div className="w-full flex justify-center items-center h-screen text-center">
      <div className="container bg-white p-3 rounded-md shadow-lg">
        <div className="flex justify-between  items-center text-2xl">
          <div className={LINE_STYLES} />
          <div className="mr-3 ml-3 whitespace-nowrap" >{SIGN_IN_TEXT}</div>
          <div className={LINE_STYLES} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-5"
        >
          {
            Fields.map(({
              name,
              placeholder,
              type,
            }) => (
              <TextField
                key={name}
                name={name}
                placeholder={placeholder}
                control={control}
                isRequired={true}
                type={type}
                className="mt-1"
              />
            ))
          }
          <div className="flex justify-center">
            <Button
              loading={isLoading}
              type="submit"
              className="mb-3 mt-3"
            >
              {LOGIN_TEXT}
            </Button >
          </div>
          <Link
            text={LINK_TEXT}
            to="/sign-up"
          />
        </form >
      </div>
    </div>
  )
}

export default SignIn