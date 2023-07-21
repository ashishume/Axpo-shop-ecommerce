import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface RootState {
  value: [];
}
const initialState: RootState = {
  value: [],
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("http://localhost:4000/api/v1/products");
  return response.data;
});
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // state.value += 1;
    },
    decrement: (state) => {
      // state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state: RootState, action: PayloadAction<any>) => {
      state.value = action.payload;
    });
    builder.addCase(fetchProducts.pending, (state: RootState, action: PayloadAction<any>) => {
    });
    builder.addCase(fetchProducts.rejected, (state: RootState, action: PayloadAction<any>) => {
      console.log(state);
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: RootState) => state.value;
export default counterSlice.reducer;
