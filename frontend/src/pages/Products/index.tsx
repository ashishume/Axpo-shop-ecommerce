import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productSlice";

const Products = () => {
  const dispatch = useAppDispatch();
  const productsResponse = useAppSelector((state) => state.productsSlice);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return <div>
    <div className="text-lg">Products</div>
  </div>;
};

export default Products;
