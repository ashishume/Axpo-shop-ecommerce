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
} from '../../store/flightsSlices';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import Autocomplete from '../../components/Autocomplete';
import { IFlight, ILocation } from '../../models/flights';
import { ISearchFlights } from '../../../../models/Form';
import FlightCardView from '../../components/FlightViewCard';
import SpinningLoader from '../../../../components/SpinningLoader';

const SearchFlight = () => {
  const inputStyle =
    'input-field-content inline-block p-5 text-xl mx-1 rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';

  const inputLabelStyle = 'block leading-6 text-gray-900 text-xl py-3 mx-1';

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
  const [flightData, setflightData] = useState<{
    destinationLocation: string;
    fromDate: string;
    passengerCount: string;
    sourceLocation: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchLocations());
    // dispatch(fetchFlights());
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchFlights>();
  const onSubmit = async (data: FieldValues) => {
    const payload = {
      sourceLocation: source.airport,
      destinationLocation: destination.airport,
      fromDate: data.fromDate,
      passengerCount: '2',
    };
    setflightData(payload);
    if (payload) {
      localStorage.setItem('flightBookingData', JSON.stringify(payload));
    }
    dispatch(fetchFlights());

    try {
    } catch (e: any) {}
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

  function handleFlightBooking(flight: IFlight) {
    if (flight && flightData)
      navigate(`/bookings/book-flight/${flight._id}/${flightData?.fromDate}`);
  }

  return (
    <Layout>
      <div className="search-flight-container">
        <div className="search-flight-content">
          <div className="trips">
            <div>
              <input type="radio" name="trip-way" />
              <div className="trip-way-text">One way</div>
            </div>
            <div>
              <input type="radio" name="trip-way" />
              <div className="trip-way-text">Round trip</div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="input-form">
            <div className="mt-2 inline-block input-container">
              <label className={`${inputLabelStyle} input-label`}>From</label>
              <input
                id="sourceAirport"
                type="text"
                autoComplete="off"
                value={source.airport}
                {...register('sourceAirport', {
                  required: true,
                })}
                placeholder="Enter city or airport"
                onChange={autocompleteSourceLocation}
                className={inputStyle}
              />
              <Autocomplete
                handleLocationSelection={handleSourceLocationSelection}
                searchedLocationResults={searchedSourceLocationResults}
              />
              {errors.sourceAirport && (
                <div className="error-message">Please enter valid source</div>
              )}
            </div>
            <div className="mt-2 inline-block input-container">
              <label className={`${inputLabelStyle} input-label`}>To</label>
              <input
                id="destinationAirport"
                type="text"
                autoComplete="off"
                value={destination.airport}
                placeholder="Enter city or airport"
                {...register('destinationAirport', {
                  required: true,
                })}
                onChange={autocompleteDestinationLocation}
                className={inputStyle}
              />
              <Autocomplete
                handleLocationSelection={handleDestinationLocationSelection}
                searchedLocationResults={searchedDestinationLocationResults}
              />
              {errors.destinationAirport && (
                <div className="error-message">
                  Please enter valid destination
                </div>
              )}
            </div>
            <div className="mt-2 inline-block input-container">
              <label className={`${inputLabelStyle} input-label`}>
                Departure date
              </label>
              <input
                id="fromDate"
                type="date"
                {...register('fromDate', {
                  required: true,
                })}
                className={inputStyle}
              />
              {errors.fromDate && (
                <div className="error-message">Please enter a date</div>
              )}
            </div>
            <div className="mt-2 inline-block input-container">
              <label className={`${inputLabelStyle} input-label`}>
                No. of passengers
              </label>
              <input
                id="passengerCount"
                type="number"
                min="0"
                {...register('passengerCount', {
                  required: true,
                })}
                className={inputStyle}
              />
              {errors.passengerCount && (
                <div className="error-message">
                  Please enter number of passengers
                </div>
              )}
            </div>
            <div className="mt-2 block rounded-md button-container">
              <button
                id="fromDate"
                className="p-5 m-5 bg-sky-600 rounded-lg text-color text-white font-bold text-xl button-class"
              >
                SEARCH FLIGHTS
              </button>
            </div>
          </form>
        </div>

        <div className="flights-data-container">
          {flights &&
            flights.map((flight) => {
              return (
                <FlightCardView
                  key={flight._id}
                  flightData={flight}
                  handleFlightBooking={() => handleFlightBooking(flight)}
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
