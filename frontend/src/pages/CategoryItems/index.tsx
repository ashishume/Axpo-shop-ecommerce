import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearState, fetchCategoryProducts } from "../../store/slices/productSlice";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Product-card";
import Layout from "../../components/layout";
import SpinningLoader from "../../components/SpinningLoader";

const CategoryItems = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const products = useAppSelector((state) => state.productsSlice.categoryProducts);
  useEffect(() => {
    dispatch(fetchCategoryProducts(params.categoryId as string));
    return () => {
      dispatch(clearState());
    };
  }, []);
  function handleProduct() {
    console.log("handle");
  }
  return (
    <Layout>
      {products?.length ? (
        products.map((product) => {
          return <ProductCard product={product} handleProduct={handleProduct} />;
        })
      ) : (
        <SpinningLoader />
      )}
    </Layout>
  );
};

export default CategoryItems;
