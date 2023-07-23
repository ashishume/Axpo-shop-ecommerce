import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/login";
import App from "../App";
import Signup from "../components/Auth/signup";
// import PrivateRoute from "./private-route";
import Products from "../pages/Products";
import PrivateRoute from "./private-route";

const RoutePaths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/products" element={<Products />} />
        {/* <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePaths;
