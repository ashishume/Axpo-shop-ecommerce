import { useEffect, useState } from 'react';
import Layout from '../../../../components/layout';
import FlightSeatBooking from '../../components/FlightSeatBooking';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchSeats } from '../../store/seatsSlices';
import { useParams } from 'react-router-dom';
import { bookFlightSeat, fetchOneFlight } from '../../store/flightsSlices';
import './book-flight.scss';
import { Button } from '@mui/material';
const BookFlight = () => {
  const dispatch = useAppDispatch();
  const { seats, isLoading } = useAppSelector((state) => state.seatsSlices);
  const { flight } = useAppSelector((state) => state.flightsSlices);
  const params = useParams();

  const [seatIds, setSeatIds] = useState<any>([]);

  function addSeatsForBooking(column: any) {
    /** TODO: find a way to avoid duplicate seat ids and also unselect the selected ones without clearing all seats */
    setSeatIds((state: any) => [...state, column.seatId]);
  }

  function clearSelectedSeats(column: any) {
    setSeatIds([]);
  }

  async function confirmSeatsBooking() {
    const { flightId, fromDate } = params;
    const flightSearchData = localStorage.getItem('flightBookingData');
    const userId = localStorage.getItem('userId');
    if (flightSearchData && userId) {
      const payload = {
        flight: flightId,
        seatId: [].concat(...seatIds),
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
        <div className="wing"></div>
        <div className="text-3xl font-medium m-5">Please select your seats</div>
        <Button onClick={confirmSeatsBooking}>Confirm</Button>
        <Button onClick={clearSelectedSeats}>Clear Selected seats</Button>
        <div className="plane-seat-structure-design">
          <FlightSeatBooking
            seatIds={[].concat(...seatIds)}
            seats={seats}
            addSeatsForBooking={addSeatsForBooking}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BookFlight;
