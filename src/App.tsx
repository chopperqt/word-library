import React, { useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { routesNoAuth, routesWithAuth } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { getUserID, setUser } from "./services/user/User.store";
import supabase from "./api/client";
import { ParamsController } from "helpers/paramsController";

interface BroadcastObject {
  sync: boolean;
  search?: string;
}

function App() {
  const dispatch = useDispatch();
  const user = supabase.auth.user();
  const userID = useSelector(getUserID);
  const bc = new BroadcastChannel("test");
  const { setSearch } = ParamsController();

  let routes = routesNoAuth;

  if (user?.id) {
    routes = routesWithAuth;
  }

  useLayoutEffect(() => {
    bc.postMessage({
      sync: true,
    });

    bc.onmessage = (event) => {
      console.log("Library: ", event.data);

      if (event.data?.search) {
        setSearch(event.data.search);
      }
    };
  }, []);

  useEffect(() => {
    if (user?.id && !userID) {
      dispatch(
        setUser({
          id: user.id,
          avatarUrl: user.user_metadata.avatar_url,
          email: user.email as string,
          role: user!.role as string,
        })
      );
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {routes.map(({ path, element, index }, indexPage) => (
          <Route key={indexPage} index={index} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
