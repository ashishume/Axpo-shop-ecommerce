import React, { useEffect } from "react";
import CategoryCard from "../../components/category-card";
import Layout from "../../components/layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategory } from "../../store/slices/categorySlices";
import { ICategory } from "../../models";
import { useNavigate } from "react-router-dom";
import SpinningLoader from "../../components/SpinningLoader";

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.categorySlice);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  function openCategory(item: ICategory) {
    navigate(`/categories/${item.name.toLocaleLowerCase()}/${item._id}`);
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
        }}
      >
        {state.categories?.length > 1 ? (
          state.categories.map((category) => {
            return (
              <CategoryCard
                key={category._id}
                openCategory={() => openCategory(category)}
                imageSource={category.image}
                title={category.name}
              />
            );
          })
        ) : (
          <SpinningLoader />
        )}
      </div>
    </Layout>
  );
};

export default CategoryList;
