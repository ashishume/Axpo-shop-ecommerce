import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productSlice";
import Layout from "../../components/layout";
import ProductCard from "../../components/Product-card";
import { Axios } from "../../services/http-service";

const Products = () => {
  const dispatch = useAppDispatch();
  const productsResponse = useAppSelector((state) => state.productsSlice);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  function handleProduct(product: any) {
    console.log(product);
  }

  return (
    <Layout>
      <div className="text-lg">Products</div>
      {!productsResponse?.isLoading
        ? productsResponse.products.map((product) => {
            return <ProductCard key={product._id} product={product} handleProduct={() => handleProduct(product)} />;
          })
        : null}
    </Layout>
  );
};

export default Products;
