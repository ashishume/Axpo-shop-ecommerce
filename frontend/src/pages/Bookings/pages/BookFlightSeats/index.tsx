import { useEffect, useState } from 'react';
import Layout from '../../../../components/layout';
import FlightSeatBooking from '../../components/FlightSeatBooking';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchSeats } from '../../store/seatsSlices';
import { useNavigate, useParams } from 'react-router-dom';
import { bookFlightSeat, fetchOneFlight } from '../../store/flightsSlices';
import './book-flight.scss';
import { Button } from '@mui/material';
const BookFlight = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { seats, isLoading } = useAppSelector((state) => state.seatsSlices);
  const { flight } = useAppSelector((state) => state.flightsSlices);
  const params = useParams();

  const [seatIds, setSeatIds] = useState<any>([]);
  const [passengersCount, setPassengersCount] = useState(0);
  const [counter, setCounter] = useState(0);

  function addSeatsForBooking(column: any) {
    /** TODO: find a way to avoid duplicate seat ids and also unselect the selected ones without clearing all seats */
    setSeatIds((state: any) => [...state, column.seatId]);
    setCounter((prevState) => prevState + 1);
  }

  function clearSelectedSeats(column: any) {
    setSeatIds([]);
    setCounter(0);
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

      await navigate('/bookings/my-bookings');
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

    const flightSearchData = localStorage.getItem('flightBookingData');
    if (flightSearchData) {
      const flightData = JSON.parse(flightSearchData);
      setPassengersCount(flightData.passengersCount);
    }
  }, []);

  return (
    <Layout>
      <div className="flight-seats-container">
        <div className="text-3xl font-medium m-5">Please select your seats</div>
        <div className="seat-button-container">
          <Button
            onClick={confirmSeatsBooking}
            variant="outlined"
            disabled={!!![].concat(...seatIds).length}
            className="confirm-button"
          >
            Confirm
          </Button>
          <Button
            onClick={clearSelectedSeats}
            variant="outlined"
            disabled={!!![].concat(...seatIds).length}
            color="error"
            className="clear-button"
          >
            Clear Selected seats
          </Button>
        </div>
        <div className="plane-seat-structure-design">
          <FlightSeatBooking
            seatIds={[].concat(...seatIds)}
            seats={seats}
            passengersCount={passengersCount}
            counter={counter}
            addSeatsForBooking={addSeatsForBooking}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BookFlight;
