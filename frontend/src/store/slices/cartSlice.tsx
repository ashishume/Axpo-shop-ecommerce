import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../models";
import { Axios } from "../../services/http-service";

const initialState: CartState = {
  cart: {
    items: [
      {
        product: {},
        quantity: 0,
      },
    ],
    user: "",
  },
  isLoading: false,
};

export const fetchCart = createAsyncThunk("products/fetchCart", async (userId: string) => {
  const response = await Axios.get("/cart/" + userId);
  return response.data;
});
export const updateCart = createAsyncThunk("product/updateCart", async (userId: string, payload) => {
  const response = await Axios.patch("/cart/" + userId, payload);
  return response.data;
});
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state: CartState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state: CartState, action: PayloadAction<any>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state: CartState, action: PayloadAction<any>) => {
      state.cart =  {
        items: [
          {
            product: {},
            quantity: 0,
          },
        ],
        user: "",
      };
      state.isLoading = false;
    });
    builder.addCase(updateCart.pending, (state: CartState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(updateCart.fulfilled, (state: CartState, action: PayloadAction<any>) => {
      state.isLoading = false;
    });
    builder.addCase(updateCart.rejected, (state: CartState, action: PayloadAction<any>) => {
      state.isLoading = false;
    });
  },
});

export const selectCount = (state: CartState) => state.cart;
export default productsSlice.reducer;
