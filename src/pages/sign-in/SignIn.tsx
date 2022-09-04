import TextField from "common/text-field/TextField"
import Button from "components/button/Button"
import useSignIn from "./hooks/useSignIn"
import {
  Fields,
  LINK_TEXT,
  SIGN_IN_TEXT,
} from "./constants"
import Link from "components/link"

const SignIn = () => {
  const {
    handleSubmit,
    control
  } = useSignIn()

  return (
    <div className="w-full flex justify-center items-center h-screen text-center">
      <div className="container bg-white p-3 rounded-md shadow-lg">
        < form onSubmit={handleSubmit} >
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
              type="submit"
              className="mb-3"
            >
              {SIGN_IN_TEXT}
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