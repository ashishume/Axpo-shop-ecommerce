import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FlightsState } from '../constants/flights';
import { Axios } from '../../../services/http-service';
import { API_PATHS } from '../../../constants/api-path';

const initialLocation = {
  id: 0,
  location: '',
  airport: '',
};

const initialState: FlightsState = {
  locations: [initialLocation],
  isLoading: false,
  searchedLocationResults: [initialLocation],
};

export const fetchLocations = createAsyncThunk(
  'bookings/fetchLocations',
  async () => {
    const response = await Axios.get(API_PATHS.LOCATIONS);
    return response.data;
  }
);

export const flightsSlices = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    searchLocations: (state, action: PayloadAction<any>) => {
      console.log(action.payload);

      state.searchedLocationResults = state.locations.filter((item) => {
        const airport = item.airport.toLowerCase();
        const location = item.location.toLowerCase();
        return (
          location.includes(action.payload) || airport.includes(action.payload)
        );
      });

      if (action.payload === '') {
        state.searchedLocationResults = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLocations.pending,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchLocations.fulfilled,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.locations = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchLocations.rejected,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.locations = [initialLocation];
        state.isLoading = false;
      }
    );
  },
});
export const { searchLocations } = flightsSlices.actions;
export default flightsSlices.reducer;
