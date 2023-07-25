import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productSlice";
import Layout from "../../components/layout";
import ProductCard from "../../components/Product-card";
import { Axios } from "../../services/http-service";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/product";
import useDidMount from "../../services/didMount";

const Products = () => {
  const dispatch = useAppDispatch();
  const productsResponse = useAppSelector((state) => state.productsSlice);
  const navigate = useNavigate();
  const didMount = useDidMount(true);
  useEffect(() => {
    if (didMount) {
      dispatch(fetchProducts());
    }
  }, []);

  function handleProduct(product: IProduct) {
    const title = product.name.split(" ").join("-").toLocaleLowerCase();
    navigate(`/product/${title}/${product._id}`);
  }

  return (
    <Layout>
      <div className="text-2xl mx-8 my-2 font-bold">Most selling products</div>
      <div className="mx-5">
        {!productsResponse?.isLoading ? (
          productsResponse.products.map((product) => {
            return <ProductCard key={product._id} product={product} handleProduct={() => handleProduct(product)} />;
          })
        ) : (
          <div className="mx-5 font-bold">Loading...</div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
