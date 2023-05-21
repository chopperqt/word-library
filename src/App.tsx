import React, { useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ParamsController } from "helpers/paramsController";

import { routesNoAuth, routesWithAuth } from "./routes";
import { getUserID, setUser } from "./services/user/User.store";
import supabase from "./api/client";

const KEY =
  process.env.REACT_APP_BROADCAST_TOKEN ||
  "55541b06-611d-478e-b2d7-028bc3d41eff";
const bc = new BroadcastChannel(KEY);

function App() {
  const dispatch = useDispatch();
  const user = supabase.auth.user();
  const userID = useSelector(getUserID);
  const { setSearch, getParam } = ParamsController();
  const location = useLocation();

  const page = getParam("page");

  let routes = routesNoAuth;

  if (user?.id) {
    routes = routesWithAuth;
  }

  useLayoutEffect(() => {
    bc.postMessage({
      sync: true,
    });

    bc.onmessage = (event) => {
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

  useEffect(() => {
    if (!page) {
      return;
    }

    bc.postMessage({
      sync: true,
      search: location.search,
    });
  }, [page]);

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
