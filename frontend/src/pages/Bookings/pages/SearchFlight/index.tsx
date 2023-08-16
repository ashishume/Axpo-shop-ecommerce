import { useEffect, useState } from 'react';
import Layout from '../../../../components/layout';
import './searchFlight.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchLocations,
  searchSourceLocations,
  searchDestinationLocations,
  clearSourceLocations,
  clearDestinationLocations,
  fetchFlights,
  clearFlightsSearchData,
} from '../../store/flightsSlices';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { IFlight, IFlightSearch, ILocation } from '../../models/flights';
import { ISearchFlights } from '../../../../models/Form';
import FlightCardView from '../../components/FlightViewCard';
import SpinningLoader from '../../../../components/SpinningLoader';
import FlightSearchBar from '../../components/SearchFlight';

const SearchFlight = () => {
  const dispatch = useAppDispatch();
  const {
    locations,
    searchedSourceLocationResults,
    searchedDestinationLocationResults,
    flights,
    isLoading,
  } = useAppSelector((state) => state.flightsSlices);

  const [source, setSource] = useState({
    location: '',
    airport: '',
  });
  const [destination, setDestination] = useState({
    location: '',
    airport: '',
  });
  const [flightData, setflightData] = useState<IFlightSearch | null>(null);

  useEffect(() => {
    dispatch(fetchLocations());

    return () => {
      dispatch(clearFlightsSearchData());
    };
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchFlights>();
  const onSubmit = async (data: FieldValues) => {
    const payload = {
      sourceAirport: source.airport,
      destinationAirport: destination.airport,
      fromDate: data.fromDate,
      toDate: data.toDate ?? null,
      passengersCount: data.passengersCount,
    };
    setflightData(payload);
    if (payload) {
      localStorage.setItem('flightBookingData', JSON.stringify(payload));
    }

    dispatch(fetchFlights(payload));
  };

  function autocompleteSourceLocation(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(searchSourceLocations(e.target.value));
    setSource((state) => {
      return {
        ...state,
        location: e.target.value,
        airport: e.target.value,
      };
    });
  }

  function autocompleteDestinationLocation(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch(searchDestinationLocations(e.target.value));
    setDestination((state) => {
      return {
        ...state,
        location: e.target.value,
        airport: e.target.value,
      };
    });
  }

  function handleSourceLocationSelection(location: ILocation) {
    dispatch(clearSourceLocations());
    setSource((state) => {
      return {
        ...state,
        airport: location.airport,
        location: location.location,
      };
    });
  }

  async function handleDestinationLocationSelection(location: ILocation) {
    dispatch(clearDestinationLocations());
    setDestination((state) => {
      return {
        ...state,
        airport: location.airport,
        location: location.location,
      };
    });
  }

  function navigateToSeatBooking(flight: IFlight) {
    if (flight && flightData)
      navigate(`/bookings/book-flight/${flight._id}/${flightData?.fromDate}`);
  }

  return (
    <Layout>
      <div className="search-flight-container">
        <FlightSearchBar
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          source={source}
          register={register}
          autocompleteSourceLocation={autocompleteSourceLocation}
          handleSourceLocationSelection={handleSourceLocationSelection}
          searchedSourceLocationResults={searchedSourceLocationResults}
          destination={destination}
          errors={errors}
          autocompleteDestinationLocation={autocompleteDestinationLocation}
          handleDestinationLocationSelection={
            handleDestinationLocationSelection
          }
          searchedDestinationLocationResults={
            searchedDestinationLocationResults
          }
        />

        <div className="flights-data-container">
          {flights &&
            flights.map((flight) => {
              return (
                <FlightCardView
                  key={flight._id}
                  flightData={flight}
                  handleFlightBooking={() => navigateToSeatBooking(flight)}
                />
              );
            })}

          {isLoading ? <SpinningLoader /> : null}
        </div>
      </div>
    </Layout>
  );
};

export default SearchFlight;
