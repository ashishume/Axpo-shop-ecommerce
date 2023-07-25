import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store";
import RoutePaths from "./router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <RoutePaths />
    {/* </React.StrictMode> */}
  </Provider>
);
