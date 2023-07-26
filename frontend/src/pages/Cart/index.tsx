import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchCart } from "../../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) dispatch(fetchCart(userId));
  }, []);
  return <div>Cart</div>;
};

export default Cart;
