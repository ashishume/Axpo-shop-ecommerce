import React, { useEffect } from 'react';
import Layout from '../../../../components/layout';
import FlightSeatBooking from '../../components/FlightSeatBooking';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchSeats } from '../../store/seatsSlices';
import { useParams } from 'react-router-dom';
import { fetchOneFlight } from '../../store/flightsSlices';

const BookFlight = () => {
  const dispatch = useAppDispatch();
  const { seats, isLoading } = useAppSelector((state) => state.seatsSlices);
  const { flight } = useAppSelector((state) => state.flightsSlices);
  const params = useParams();
  const { flightId } = params;
  useEffect(() => {}, [params?.flightId]);

  function handleBooking(column: any) {
    const { flightId, fromDate } = params;
    const flightSearchData = localStorage.getItem('flightBookingData');
    const userId = localStorage.getItem('userId');
    if (flightSearchData && userId) {
      const payload = {
        flight: flightId,
        ...column,
        fromDate: fromDate,
        toDate: null,
        ...JSON.parse(flightSearchData),
        bookingClass: 'Economy',
        user: userId,
        price: flight?.price,
        passengerDetails: null,
      };
      console.log(payload);
    }
    // Axios.post('/flight/book', payload).then((response) => {
    //   console.log(response);
    // });
  }

  useEffect(() => {
    if (params?.flightId && params?.fromDate) {
      dispatch(
        fetchSeats({
          flight: params.flightId,
          fromDate: params.fromDate,
        })
      );
      dispatch(fetchOneFlight(params?.flightId));
    }
  }, []);

  return (
    <Layout>
      <FlightSeatBooking seats={seats} handleBooking={handleBooking} />
    </Layout>
  );
};

export default BookFlight;
