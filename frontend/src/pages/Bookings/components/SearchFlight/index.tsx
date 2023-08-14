import { FormEventHandler } from 'react';
import Autocomplete from '../Autocomplete';
import './style.scss';
import { ILocation } from '../../models/flights';
import { FieldValues } from 'react-hook-form';

const FlightSearchBar = ({
  handleSubmit,
  onSubmit,
  source,
  register,
  autocompleteSourceLocation,
  handleSourceLocationSelection,
  searchedSourceLocationResults,
  destination,
  errors,
  autocompleteDestinationLocation,
  handleDestinationLocationSelection,
  searchedDestinationLocationResults,
}: {
  handleSubmit: (v: any) => FormEventHandler<HTMLFormElement>;
  onSubmit: (data: FieldValues) => void;
  source: { airport: string };
  register: any;
  autocompleteSourceLocation: (e: any) => void;
  handleSourceLocationSelection: (e: any) => void;
  searchedSourceLocationResults: ILocation[];
  destination: { airport: string };
  errors: any;
  autocompleteDestinationLocation: (e: any) => void;
  handleDestinationLocationSelection: (e: any) => void;
  searchedDestinationLocationResults: ILocation[];
}) => {
  const inputStyle =
    'input-field-content inline-block p-5 text-xl mx-1 rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';

  const inputLabelStyle = 'block leading-6 text-gray-900 text-xl py-3 mx-1';

  return (
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
            <div className="error-message">Please enter valid destination</div>
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
  );
};

export default FlightSearchBar;
