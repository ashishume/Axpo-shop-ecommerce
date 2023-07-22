import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/login";
import App from "../App";
import Signup from "../components/Auth/signup";
import PrivateRoute from "./private-route";

const RoutePaths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePaths;
