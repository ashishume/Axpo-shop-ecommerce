import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchCart } from "../../store/slices/cartSlice";
import Layout from "../../components/layout";

const Cart = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) dispatch(fetchCart(userId));
  }, []);
  return <Layout></Layout>;
};

export default Cart;
