import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FlightsState } from '../models/flights';
import { Axios } from '../../../services/http-service';
import { API_PATHS } from '../../../constants/api-path';

const initialState: FlightsState = {
  locations: [],
  isLoading: false,
  searchedSourceLocationResults: [],
  searchedDestinationLocationResults: [],
  flights: [],
  flight: null,
};

export const fetchLocations = createAsyncThunk(
  'bookings/fetchLocations',
  async () => {
    try {
      const response = await Axios.get(API_PATHS.LOCATIONS);
      return response.data;
    } catch (e: any) {
      console.error(e.response.message);
    }
  }
);
export const fetchFlights = createAsyncThunk(
  'bookings/fetchFlights',
  async () => {
    try {
      const response = await Axios.get(API_PATHS.FLIGHTS);
      return response.data;
    } catch (e: any) {
      console.error(e.response.message);
    }
  }
);
export const fetchOneFlight = createAsyncThunk(
  'bookings/fetchOneFlight',
  async (flightId: string) => {
    try {
      const response = await Axios.get(API_PATHS.FLIGHT + '/' + flightId);
      return response.data;
    } catch (e: any) {
      console.error(e.response.message);
    }
  }
);
export const bookFlightSeat = createAsyncThunk(
  'bookings/bookFlightSeat',
  async (payload: any) => {
    try {
      const response = await Axios.post(API_PATHS.FLIGHT_BOOK, payload);
      return response.data;
    } catch (e: any) {
      console.error(e.response.message);
    }
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

    //fetch all flights data
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

    //fetch each flight data
    builder.addCase(
      fetchOneFlight.pending,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchOneFlight.fulfilled,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.flight = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchOneFlight.rejected,
      (state: FlightsState, action: PayloadAction<any>) => {
        state.flight = null;
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
