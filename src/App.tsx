import { useEffect } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom'

import {
  routesNoAuth,
  routesWithAuth,
} from 'routes';
import Icon, { IconsList } from 'components/icon/Icon';
import { logOut } from 'api/auth.api';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  clearUser,
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

  const handleLogOut = async () => {
    const response = await logOut()

    if (response) {
      return
    }

    dispatch(clearUser())
  }

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
      {!!user?.id && (
        <button
          className="text-black absolute right-10 top-10 text-xl"
          onClick={handleLogOut}
        >
          <Icon icon={IconsList.logout} />
        </button>
      )}
    </div>
  );
}

export default App;
