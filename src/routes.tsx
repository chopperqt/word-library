import Library from "pages/library/Library"
import SignIn from "pages/sign-in/SignIn"
import { Links } from "helpers/links"
import { Navigate } from "react-router-dom"

export const routesNoAuth = [
  {
    path: Links.library,
    element: <Navigate to={Links.signIn} />,
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
    element: <Navigate to={Links.signIn} />,
    index: true,
  },
]

export const routesWithAuth = [
  {
    path: Links.library,
    element: <Library />,
    index: false,
  },
  {
    path: Links.signIn,
    element: <Navigate to={Links.library} />,
    index: false,
  },
  {
    path: Links.main,
    element: <Navigate to={Links.library} />,
    index: false,
  },
  {
    path: Links.signUp,
    element: <Navigate to={Links.library} />,
    index: false,
  },
]