import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../components/Auth/login';
import App from '../App';
import Signup from '../components/Auth/signup';
// import PrivateRoute from "./private-route";
import Products from '../pages/Products';
import PrivateRoute from './private-route';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import CategoryList from '../pages/Category';
import CategoryItems from '../pages/CategoryItems';
import Search from '../pages/Search';
import Layout from '../components/layout';
import Orders from '../pages/Orders';
import { useEffect, useState } from 'react';
import { Axios } from '../services/http-service';

const RoutePaths = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await Axios.get('/validate');
        if (response.status === 200) {
          setIsLoggedIn(response.data.isLoggedIn);
        }
      } catch (e: any) {
        setIsLoggedIn(e.response.data.isLoggedIn);
      }
    };
    checkLogin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <App />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Layout>
                <CategoryList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/:categoryName/:categoryId"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <CategoryItems />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:title/:productId"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Orders />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePaths;
