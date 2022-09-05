import { useEffect } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom'
import { routes } from 'routes';
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
  const userID = useSelector(getUserID)
  const user = supabase.auth.user()

  const handleLogOut = async () => {
    const response = await logOut()

    if (response) {
      return
    }

    dispatch(clearUser())
  }

  useEffect(() => {
    if (user && user?.id && user?.email && user?.role) {
      const {
        id,
        email,
        role,
        user_metadata,
      } = user

      dispatch(setUser({
        id,
        email,
        role,
        avatarUrl: user_metadata?.avatar_url || '',
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
        }) => (
          <Route
            key={path}
            index={index}
            path={path}
            element={element}
          />
        ))}
      </Routes>
      {userID && (
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
