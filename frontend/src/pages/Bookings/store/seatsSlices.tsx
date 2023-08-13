import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SeatsState } from '../models/flights';
import { Axios } from '../../../services/http-service';
import { API_PATHS } from '../../../constants/api-path';

const initialState: SeatsState = {
  seats: null,
  isLoading: false,
};

export const fetchSeats = createAsyncThunk(
  'bookings/fetchSeats',
  async (payload: { flight: string; fromDate: string }) => {
    const response = await Axios.post(API_PATHS.FLIGHT_SEATS, payload);
    return response.data;
  }
);

export const seatsSlices = createSlice({
  name: 'seats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSeats.pending,
      (state: SeatsState, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchSeats.fulfilled,
      (state: SeatsState, action: PayloadAction<any>) => {
        state.seats = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchSeats.rejected,
      (state: SeatsState, action: PayloadAction<any>) => {
        state.seats = null;
        state.isLoading = false;
      }
    );
  },
});
export const {} = seatsSlices.actions;
export default seatsSlices.reducer;
