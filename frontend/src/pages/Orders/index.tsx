import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchOrders } from "../../store/slices/ordersSlice";
import Layout from "../../components/layout";

const Orders = () => {
  const dispatch = useAppDispatch();
//   const params = useParams();
  const navigate = useNavigate();
  const { isLoading, orders } = useAppSelector((state) => state.ordersSlice);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) dispatch(fetchOrders(userId));
  }, []);
  return (
    <Layout>
      <h1>My orders</h1>
      {console.log(orders)}
    </Layout>
  );
};

export default Orders;
