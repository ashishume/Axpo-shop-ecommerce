import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ProductCard from "../../components/Product-card";
import { newTitle } from "../../Utils/convertTextToLink";
import { IProduct } from "../../models/product";
import SpinningLoader from "../../components/SpinningLoader";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("searchValue");

  const searchProducts = useAppSelector((state) => state.productsSlice.searchProducts);
  const isLoading = useAppSelector((state) => state.productsSlice.isLoading);
  function handleProduct(product: IProduct) {
    navigate(`/product/${newTitle(product.name)}/${product._id}`);
  }

  return (
    <Layout searchValue={paramValue} isFocused={true}>
      {isLoading ? <SpinningLoader /> : ""}
      {searchProducts.map((product) => {
        return <ProductCard key={product._id} product={product} handleProduct={() => handleProduct(product)} />;
      })}
      {!searchProducts?.length ? <div className="m-2 p-2 text-center font-normal text-lg">No results found</div> : ""}
    </Layout>
  );
};

export default Search;
