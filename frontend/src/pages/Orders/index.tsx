import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchOrders } from "../../store/slices/ordersSlice";
import Layout from "../../components/layout";
import ProductCard from "../../components/Product-card";
import { newTitle } from "../../Utils/convertTextToLink";

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
      {orders.map((order) => {
        return (
          //TODO: styling this page remains
          <div style={{ borderBottom: "solid 2px black" }}>
            {order.products.map(({ product, quantity, _id }) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleProduct={() => navigate(`/product/${newTitle(product.name)}/${product._id}`)}
                />
              );
            })}
          </div>
        );
      })}
    </Layout>
  );
};

export default Orders;
