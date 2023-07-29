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

  const { getParam, setParam } = ParamsController();

  const pageParam = getParam("page");

  const token = localStorage.getItem("token");

  const loginUser = async () => {
    const user = supabase.auth.user();

    console.log("user", user);

    if (!user || !user?.id) {
      if (!token) {
        return;
      }

      const { session } = await supabase.auth.setSession(token);

      console.log("sessison: ", session);

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

  useLayoutEffect(() => {
    bc.postMessage({
      isConnected: true,
    });

    setConnected(true);

    bc.onmessage = (event) => {
      console.log("get message from english-wrapper", event.data);

      if (event.data.initialPage) {
        setInitialPage(event.data.initialPage);

        setParam("page", event.data.initialPage);
      }
    };
  }, []);

  console.log("isConnected", isConnected);
  console.log("isFetched", isFetched);
  console.log("initialPage", initialPage);

  if (!isConnected || !isFetched || !initialPage) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
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
