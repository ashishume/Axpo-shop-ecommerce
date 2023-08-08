import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./filter.scss";
import { fetchCategory } from "../../store/slices/categorySlices";
import SpinningLoader from "../SpinningLoader";
import Checkbox from "@mui/material/Checkbox";
const Filter = ({ handleCategorySelection }: { handleCategorySelection: (e: string, checked: boolean) => void }) => {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.categorySlice);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="filter-container ml-6">
      {isLoading ? <SpinningLoader /> : ""}
      {categories.map((category) => {
        return (
          <div key={category._id}>
            <Checkbox value={category._id} onChange={(e) => handleCategorySelection(e.target.value, e.target.checked)} />
            {category.name}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
