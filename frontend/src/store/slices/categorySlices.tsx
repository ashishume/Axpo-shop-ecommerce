import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState, CategoryState } from "../../models";
import { Axios } from "../../services/http-service";
import { ICart } from "../../models/cart";

const initialState: CategoryState = {
  categories: [
    {
      name: "",
      _id: "",
      image: "",
    },
  ],
  isLoading: false,
};

export const fetchCategory = createAsyncThunk("category/fetchCategory", async () => {
  const response = await Axios.get("/category");
  return response.data;
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCategory
    builder.addCase(fetchCategory.pending, (state: CategoryState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state: CategoryState, action: PayloadAction<any>) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCategory.rejected, (state: CategoryState, action: PayloadAction<any>) => {
      state.categories = [];
      state.isLoading = false;
    });
  },
});
export const {} = categorySlice.actions;

export const selectCategories = (state: CategoryState) => state.categories;
export default categorySlice.reducer;
