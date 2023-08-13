import { useEffect } from 'react';
import Layout from '../../../../components/layout';
import FlightSeatBooking from '../../components/FlightSeatBooking';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchSeats } from '../../store/seatsSlices';
import { useParams } from 'react-router-dom';
import { bookFlightSeat, fetchOneFlight } from '../../store/flightsSlices';
import './book-flight.scss';
const BookFlight = () => {
  const dispatch = useAppDispatch();
  const { seats, isLoading } = useAppSelector((state) => state.seatsSlices);
  const { flight } = useAppSelector((state) => state.flightsSlices);
  const params = useParams();
  async function handleBooking(column: any) {
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
      await dispatch(bookFlightSeat(payload));
      await fetchSeatsStructure(params);
    }
  }
  function fetchSeatsStructure(params: any) {
    dispatch(
      fetchSeats({
        flight: params.flightId,
        fromDate: params.fromDate,
      })
    );
  }
  useEffect(() => {
    if (params?.flightId && params?.fromDate) {
      fetchSeatsStructure(params);
      dispatch(fetchOneFlight(params?.flightId));
    }
  }, []);

  return (
    <Layout>
      <div className="flight-seats-container">
       
        <FlightSeatBooking seats={seats} handleBooking={handleBooking} />
      </div>
    </Layout>
  );
};

export default BookFlight;
