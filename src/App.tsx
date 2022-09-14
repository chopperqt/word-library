import { useEffect } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom'

import {
  routesNoAuth,
  routesWithAuth,
} from 'routes';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  getUserID,
  setUser,
} from 'services/user/User.store';
import supabase from 'api/client';

function App() {
  const dispatch = useDispatch()
  const user = supabase.auth.user()
  const userID = useSelector(getUserID)
  const routes = user?.id
    ? routesWithAuth
    : routesNoAuth

  useEffect(() => {
    if (user?.id && !userID) {
      dispatch(setUser({
        id: user.id,
        avatarUrl: user.user_metadata.avatar_url,
        email: user.email as string,
        role: user!.role as string,
      }))
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        {routes.map(({
          path,
          element,
          index,
        }, indexPage) => (
          <Route
            key={indexPage}
            index={index}
            path={path}
            element={element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
