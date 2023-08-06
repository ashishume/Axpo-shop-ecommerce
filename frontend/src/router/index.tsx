import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/login";
import App from "../App";
import Signup from "../components/Auth/signup";
// import PrivateRoute from "./private-route";
import Products from "../pages/Products";
import PrivateRoute from "./private-route";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import CategoryList from "../pages/Category";
import CategoryItems from "../pages/CategoryItems";

const RoutePaths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:categoryName/:categoryId" element={<CategoryItems />} />
        <Route path="/product/:title/:productId" element={<Product />} />
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
