import {
  Routes,
  Route,
} from 'react-router-dom'
import { routes } from 'routes';

import Library from './pages/library/Library';

function App() {
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
    </div>
  );
}

export default App;
