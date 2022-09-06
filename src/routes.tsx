import Library from "pages/library/Library"
import SignIn from "pages/sign-in/SignIn"
import { Links } from "helpers/links"

export const routes = [
  {
    path: Links.library,
    element: <Library />,
    index: false,
  },
  {
    path: Links.signIn,
    element: <SignIn />,
    index: false,
  },
  {
    path: Links.signUp,
    element: <div>Sign UP </div>,
    index: false,
  },
  {
    path: Links.main,
    element: <SignIn />,
    index: true,
  }
]
