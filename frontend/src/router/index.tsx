import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/login";
import App from "../App";
import Signup from "../components/Auth/signup";
// import PrivateRoute from "./private-route";
import Products from "../pages/Products";

const RoutePaths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePaths;
