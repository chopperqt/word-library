import { lazy, Suspense } from "react";

import { Links } from "helpers/links";
import { Navigate } from "react-router-dom";
import { AutoSizer } from "react-virtualized";

const Home = lazy(() => import("pages/home/Home"));
const Library = lazy(() => import("pages/library/Library"));
const SignIn = lazy(() => import("pages/sign-in/SignIn"));

export const routesNoAuth = [
  {
    path: Links.main,
    element: <Home />,
    index: true,
  },
  {
    path: Links.library,
    element: <Navigate to={Links.signIn} />,
    index: false,
  },
  {
    path: Links.signIn,
    element: (
      <Suspense fallback="">
        <SignIn />
      </Suspense>
    ),
    index: false,
  },
  {
    path: Links.signUp,
    element: <div>Sign UP </div>,
    index: false,
  },
  {
    path: Links.signIn,
    element: <Navigate to={Links.signIn} />,
    index: false,
  },
];

export const routesWithAuth = [
  {
    path: Links.library,
    element: (
      <Suspense fallback="">
        <AutoSizer disableWidth>
          {({ width, height }) => <Library width={width} height={height} />}
        </AutoSizer>
      </Suspense>
    ),
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
];
