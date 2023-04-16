export const Fields = {
  login: 'login',
  password: 'password'
}

type Field = 'login' | 'password'

type FormFieldsProps = Record<Field, { item: any, input: any }>

export const FormFields:FormFieldsProps = {
  login: {
    item: {
      name: Fields.login,
      rules: [
        {
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          message: 'Email is incorrect!'
        },
        {
          required: true,
          message: 'This field is required!'
        },
      ]
    },
    input: {
      placeholder: 'Login'
    }
  },
  password: {
    item: {
      name: Fields.password,
      rules: [
        {
          pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
          message: 'Password is incorrect!'
        },
        {
          required: true,
          message: 'This field is required!'
        },
      ]
    },
    input: {
      placeholder: 'Password'
    }
  },
}

export const SIGN_IN_TEXT = 'Sign in'
export const LOGIN_TEXT = 'Login'
export const LINK_TEXT = "Haven`t registered yet?"
export const LINE_STYLES = 'h-1 bg-black w-full rounded-md opacity-10'