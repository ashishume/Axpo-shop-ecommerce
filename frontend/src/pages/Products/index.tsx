import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productSlice";
import Layout from "../../components/layout";
import ProductCard from "../../components/Product-card";
import { Axios } from "../../services/http-service";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/product";
import useDidMount from "../../services/didMount";
import SpinningLoader from "../../components/SpinningLoader";
import { newTitle } from "../../Utils/convertTextToLink";

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
    navigate(`/product/${newTitle(product.name)}/${product._id}`);
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
          <SpinningLoader />
        )}
      </div>
    </Layout>
  );
};

export default Products;
