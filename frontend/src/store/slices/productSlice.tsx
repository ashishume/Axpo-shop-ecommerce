import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../models";
import { Axios } from "../../services/http-service";

const productInitial = {
  _id: "",
  name: "",
  category: {
    name: "",
  },
  brand: "",
  quantity: 0,
  price: 0,
  image: "",
  description: "",
};

const initialState: ProductState = {
  products: [],
  product: productInitial,
  isLoading: false,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await Axios.get("/products", { withCredentials: true });
  return response.data;
});
export const fetchProduct = createAsyncThunk("product/fetchProduct", async (productId: string) => {
  const response = await Axios.get("/product/" + productId, { withCredentials: true });
  return response.data;
});
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state: ProductState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state: ProductState, action: PayloadAction<any>) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state: ProductState, action: PayloadAction<any>) => {
      state.products = [];
      state.isLoading = false;
    });
    builder.addCase(fetchProduct.pending, (state: ProductState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state: ProductState, action: PayloadAction<any>) => {
      state.product = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProduct.rejected, (state: ProductState, action: PayloadAction<any>) => {
      state.product = productInitial;
      state.isLoading = false;
    });
  },
});

// export const {} = productsSlice.actions;
export const selectCount = (state: ProductState) => state.products;
export default productsSlice.reducer;
