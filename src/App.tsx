import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ParamsController } from "helpers/paramsController";
import supabase from "api/client";
import { setUser } from "services/user/User.store";
import { Spin } from "antd";
import Library from "pages/library/Library";

const KEY =
  process.env.REACT_APP_BROADCAST_TOKEN ||
  "55541b06-611d-478e-b2d7-028bc3d41eff";

export const bc = new BroadcastChannel(KEY);

function App() {
  const dispatch = useDispatch();

  const [isFetched, setFetched] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [initialPage, setInitialPage] = useState<number | null>(null);

  const { setParam } = ParamsController();

  const token = localStorage.getItem("token");

  const loginUser = async () => {
    const user = supabase.auth.user();

    if (!user || !user?.id) {
      if (!token) {
        return;
      }

      const { session } = await supabase.auth.setSession(token);

      if (!session?.user) return;

      const { id, email, role } = session.user;

      dispatch(
        setUser({
          id,
          email: email || "",
          role: role || "",
          avatarUrl: "",
        })
      );

      setFetched(true);

      return;
    }

    dispatch(
      setUser({
        id: user.id,
        email: user.email || "",
        role: user.role || "",
        avatarUrl: "",
      })
    );

    setFetched(true);
  };

  useEffect(() => {
    loginUser();
  }, []);

  useEffect(() => {
    bc.postMessage({
      isConnected: true,
    });

    setConnected(true);

    bc.onmessage = (event) => {
      if (event.data.initialPage) {
        setInitialPage(event.data.initialPage);

        setParam("page", event.data.initialPage);
      }
    };
  }, []);

  if (!isConnected || !isFetched || !initialPage) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" tip="Loading app" />
      </div>
    );
  }

  return (
    <div className="App">
      <Library />
    </div>
  );
}

export default App;
