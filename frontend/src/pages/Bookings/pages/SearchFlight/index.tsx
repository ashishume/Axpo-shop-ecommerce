import { useEffect, useState } from 'react';
import Layout from '../../../../components/layout';
import './searchFlight.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchLocations, searchLocations } from '../../store/flightsSlices';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { Axios } from '../../../../services/http-service';
import { API_PATHS } from '../../../../constants/api-path';
import { Checkbox } from '@mui/material';
const SearchFlight = () => {
  const dispatch = useAppDispatch();
  const { locations, searchedLocationResults } = useAppSelector(
    (state) => state.flightsSlices
  );

  const [source, setSource] = useState('');

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  const navigate = useNavigate();
  //   const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
    } catch (e: any) {}
  };

  //   flightNo:
  //   brand:
  //   brandLogo:
  //   sourceAirport:
  //   destinationAirport:
  //   sourceLocation:
  //   destinationLocation:
  //   fromTime:
  //   toTime:
  function autocompleteLocation(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(searchLocations(e.target.value));
    setSource(e.target.value);
  }
  const inputStyle =
    'input-field-content inline-block p-5 text-xl mx-1 rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
  const inputLabelStyle = 'block leading-6 text-gray-900 text-xl py-3 mx-1';
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
              <label className={`${inputLabelStyle} input-label`}>Source</label>
              <input
                id="sourceLocation"
                type="text"
                value={source}
                {...register('sourceLocation')}
                required
                onChange={autocompleteLocation}
                className={inputStyle}
              />
              {searchedLocationResults && (
                <div
                  className={`auto-complete-location-container ${
                    searchedLocationResults?.length ? 'visible' : ''
                  }`}
                >
                  {searchedLocationResults.map((location) => {
                    return (
                      <div
                        key={location.id}
                        className="auto-complete-location-container-content"
                      >
                        <div className="inner-content">
                          <div className="location">{location.location}</div>
                          <div className="airport">{location.airport}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mt-2 inline-block input-container">
              <label className={`${inputLabelStyle} input-label`}>
                Destination
              </label>
              <input
                id="destinationLocation"
                type="text"
                {...register('destinationLocation')}
                required
                className={inputStyle}
              />
            </div>
            <div className="mt-2 inline-block input-container">
              <label className={`${inputLabelStyle} input-label`}>
                Departure date
              </label>
              <input
                id="fromDate"
                type="date"
                {...register('fromDate')}
                required
                className={inputStyle}
              />
            </div>
            <div className="mt-2 inline-block input-container">
              <label className={`${inputLabelStyle} input-label`}>
                No. of passengers
              </label>
              <input
                id="passengerCount"
                type="number"
                min="0"
                {...register('passengerCount')}
                required
                className={inputStyle}
              />
            </div>
            <div className="mt-2 block rounded-md button-container">
              <button
                id="fromDate"
                {...register('fromDate')}
                className="p-5 m-5 bg-sky-600 rounded-lg text-color text-white font-bold text-xl button-class"
              >
                SEARCH FLIGHTS
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SearchFlight;
