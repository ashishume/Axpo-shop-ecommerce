import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FlightsState } from '../constants/flights';
import { Axios } from '../../../services/http-service';
import { API_PATHS } from '../../../constants/api-path';

const initialState: FlightsState = {
  locations: [],
  isLoading: false,
  searchedSourceLocationResults: [],
  searchedDestinationLocationResults: [],
  flights: [],
};

export const fetchLocations = createAsyncThunk(
  'bookings/fetchLocations',
  async () => {
    const response = await Axios.get(API_PATHS.LOCATIONS);
    return response.data;
  }
);
export const fetchFlights = createAsyncThunk(
  'bookings/fetchFlights',
  async () => {
    const response = await Axios.get(API_PATHS.FLIGHTS);
    return response.data;
  }
);

export const flightsSlices = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    searchSourceLocations: (state, action: PayloadAction<any>) => {
      state.searchedSourceLocationResults = state.locations.filter((item) => {
        const airport = item.airport.toLowerCase();
        const location = item.location.toLowerCase();
        return (
          location.includes(action.payload) || airport.includes(action.payload)
        );
      });

      if (action.payload === '') {
        state.searchedSourceLocationResults = [];
      }
    },
    searchDestinationLocations: (state, action: PayloadAction<any>) => {
      state.searchedDestinationLocationResults = state.locations.filter(
        (item) => {
          const airport = item.airport.toLowerCase();
          const location = item.location.toLowerCase();
          return (
            location.includes(action.payload) ||
            airport.includes(action.payload)
          );
        }
      );

      if (action.payload === '') {
        state.searchedDestinationLocationResults = [];
      }
    },
    clearSourceLocations: (state) => {
      state.searchedSourceLocationResults = [];
    },
    clearDestinationLocations: (state) => {
      state.searchedDestinationLocationResults = [];
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
        state.locations = [];
        state.isLoading = false;
      }
    );


    builder.addCase(
      fetchFlights.pending,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchFlights.fulfilled,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.flights = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchFlights.rejected,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.flights = [];
        state.isLoading = false;
      }
    );
  },
});
export const {
  searchSourceLocations,
  searchDestinationLocations,
  clearSourceLocations,
  clearDestinationLocations,
} = flightsSlices.actions;
export default flightsSlices.reducer;
