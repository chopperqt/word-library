import { useUser } from 'helpers/useUser';
import {
  Routes,
  Route,
} from 'react-router-dom'
import { routes } from 'routes';
import Icon, { IconsList } from 'components/icon/Icon';
import { logOut } from 'api/auth.api';

function App() {
  const user = useUser()

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
      {user?.id && (
        <button
          className="text-black absolute right-10 top-10 text-xl"
          onClick={logOut}
        >
          <Icon icon={IconsList.logout} />
        </button>
      )}
    </div>
  );
}

export default App;
