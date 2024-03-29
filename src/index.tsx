import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./services/stores";

import "./index.css";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter basename="/library">
      <App />
    </BrowserRouter>
  </Provider>
);
