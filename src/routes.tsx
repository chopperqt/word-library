import Library from "pages/library/Library"
import SignIn from "pages/sign-in/SignIn"

export const routes = [
  {
    path: '/library',
    element: <Library />,
    index: false,
  },
  {
    path: '/',
    element: <SignIn />,
    index: true,
  },
  {
    path: '/signIn',
    element: <SignIn />,
    index: false,
  },
]
