import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState, OrdersState } from "../../models";
import { Axios } from "../../services/http-service";
import { API_PATHS } from "../../constants/api-path";

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
};

export const placeOrder = createAsyncThunk("product/placeOrder", async (payload: { user: string; products: string[] }) => {
  const response = await Axios.post(`${API_PATHS.CREATE_ORDERS}`, payload);
  return response.data;
});
export const fetchOrders = createAsyncThunk("product/orders", async ({ userId }: { userId: string }) => {
  const response = await Axios.get(`${API_PATHS.ORDERS}/${userId}`);
  return response.data;
});

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state: OrdersState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state: OrdersState, action: PayloadAction<any>) => {
      state.orders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOrders.rejected, (state: OrdersState, action: PayloadAction<any>) => {
      state.orders = [];
      state.isLoading = false;
    });
  },
});

export const selectCart = (state: OrdersState) => state.orders;
export default orderSlice.reducer;
