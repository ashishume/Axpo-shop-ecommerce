import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../models";
import { Axios } from "../../services/http-service";
import { ICart } from "../../models/cart";

const initialState: CartState = {
  cart: [],
  isLoading: false,
};

export const fetchCart = createAsyncThunk("products/fetchCart", async (userId: string) => {
  const response = await Axios.get("/cart/" + userId);
  return response.data;
});
export const updateCart = createAsyncThunk("product/updateCart", async ({ payload }: { payload: ICart }) => {
  const response = await Axios.post("/cart", payload);
  return response.data;
});
  
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCart.pending, (state: CartState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state: CartState, action: PayloadAction<any>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state: CartState, action: PayloadAction<any>) => {
      state.cart = []
      state.isLoading = false;
    });

    //updateCart
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
export default cartSlice.reducer;
