import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/login';
import App from '../App';
import Signup from '../components/Auth/signup';
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
import BookingRoutePaths from './bookings-routes';
import React from 'react';

export const IsLoggedIn = React.createContext<boolean | null>(false);

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
    <IsLoggedIn.Provider value={isLoggedIn}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* private routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/categories"
              element={
                <Layout>
                  <CategoryList />
                </Layout>
              }
            />
            <Route
              path="/categories/:categoryName/:categoryId"
              element={<CategoryItems />}
            />
            <Route path="/product/:title/:productId" element={<Product />} />
            <Route path="/my-orders" element={<Orders />} />
            <Route path="/bookings/*" element={<BookingRoutePaths />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IsLoggedIn.Provider>
  );
};

export default RoutePaths;
