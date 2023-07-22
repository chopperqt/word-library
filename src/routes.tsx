import { lazy, Suspense } from "react";

import { Links } from "helpers/links";
import { Navigate } from "react-router-dom";
import { AutoSizer } from "react-virtualized";

const Library = lazy(() => import("pages/library/Library"));

export const routesNoAuth = [
  {
    path: Links.library,
    element: <Navigate to={Links.signIn} />,
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
        <AutoSizer disableWidth>{() => <Library />}</AutoSizer>
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
