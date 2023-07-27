import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../models";
import { Axios } from "../../services/http-service";
import { ICart } from "../../models/cart";

const initialState: CartState = {
  cart: [],
  isLoading: false,
  totalPrice: 0,
};

export const fetchCart = createAsyncThunk("products/fetchCart", async (userId: string) => {
  const response = await Axios.get("/cart/" + userId);
  return response.data;
});
export const updateCart = createAsyncThunk("product/updateCart", async ({ payload }: { payload: ICart }) => {
  const response = await Axios.post("/cart", payload);
  return response.data;
});
export const updateQuantityCart = createAsyncThunk("product/updateQuantityCart", async ({ product, quantity, user }: ICart) => {
  const response = await Axios.patch("/cart/" + user, {
    product,
    quantity,
    user,
  });
  return response.data;
});
export const removeProductFromCart = createAsyncThunk(
  "product/removeFromCart",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    const response = await Axios.delete(`/cart/${userId}/${productId}`);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<any>) => {
      const indexToRemove = state.cart.findIndex((item) => item.product._id === action.payload);
      if (indexToRemove !== -1) {
        state.totalPrice = state.totalPrice - state.cart[indexToRemove].price;
        state.cart.splice(indexToRemove, 1);
      }
    },
    updateProductQuantity: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.map((item) => {
        if (item.product._id === action.payload.productId) {
          item.quantity = action.payload.quantity;
          item.price = action.payload.price * action.payload.quantity;
        }
        return item;
      });
    },
    calculateTotalPrice: (state) => {
      let totalPrice = 0;
      state.cart.forEach((item) => {
        totalPrice += item.price;
        state.totalPrice = totalPrice;
      });
    },
  },
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
      state.cart = [];
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
export const { removeProduct, updateProductQuantity, calculateTotalPrice } = cartSlice.actions;

export const selectCount = (state: CartState) => state.cart;
export default cartSlice.reducer;
