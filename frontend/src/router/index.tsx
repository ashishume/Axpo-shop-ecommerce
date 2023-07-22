import { Link, createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth/login";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
