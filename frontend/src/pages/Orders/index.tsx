import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchOrders } from "../../store/slices/ordersSlice";
import Layout from "../../components/layout";
import ProductCard from "../../components/Product-card";
import "./index.scss";
import { formatIndianRupees } from "../../Utils/convertTextToLink";
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
      <div className="order-container">
        <h1 className="text-3xl font-bold ">My orders</h1>
        {orders.map((order) => {
          return (
            <div key={order._id} className="order-content">
              {order.products.map(({ product, quantity, _id }) => {
                return <ProductCard key={product._id} product={product} />;
              })}
              <div className="ml-2">
                <div className="font-bold text-2xl">Order details:</div>
                <div className="text-base">
                  Total order value: <span className="font-bold">₹{formatIndianRupees(order.totalAmount)}</span>
                </div>
                <div className="text-base">
                  Order date: <span className="font-bold">{new Date(order.orderDate).toDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Orders;
