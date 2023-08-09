import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategoryProducts, fetchProducts, removeFilterProductsByCategory } from "../../store/slices/productSlice";
import Layout from "../../components/layout";
import ProductCard from "../../components/Product-card";
import { Axios } from "../../services/http-service";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/product";
import useDidMount from "../../services/didMount";
import SpinningLoader from "../../components/SpinningLoader";
import { newTitle } from "../../Utils/convertTextToLink";
import Filter from "../../components/Filter";
import "./products.scss";
const Products = () => {
  const dispatch = useAppDispatch();
  const { isLoading, products, categoryFilterProducts } = useAppSelector((state) => state.productsSlice);
  const navigate = useNavigate();
  const didMount = useDidMount(true);

  const [filterApplied, setFilterApplied] = useState<string[]>([]);
  useEffect(() => {
    if (didMount) {
      dispatch(fetchProducts());
    }
  }, []);

  function handleProduct(product: IProduct) {
    navigate(`/product/${newTitle(product.name)}/${product._id}`);
  }
  function handleCategorySelection(categoryId: string, checked: boolean) {
    if (checked) {
      dispatch(fetchCategoryProducts(categoryId));
      setFilterApplied((state) => [...state, categoryId]);
    } else {
      setFilterApplied((state) => state.filter((v) => v !== categoryId));
      dispatch(removeFilterProductsByCategory(categoryId));
    }
  }

  return (
    <Layout>
      <div className="text-2xl mx-6 my-2 font-bold">Most selling products</div>
      <div className="products-container">
        <div className="filter">
          <Filter handleCategorySelection={handleCategorySelection} />
        </div>
        <div className="products-content mx-5">
          {filterApplied?.length
            ? categoryFilterProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })
            : products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          {isLoading ? <SpinningLoader /> : ""}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
