import { useEffect } from 'react';
import Layout from '../../../../components/layout';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { fetchMyBookings } from '../../store/flightsSlices';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import SpinningLoader from '../../../../components/SpinningLoader';
const FlightBookings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { flightBookings, isLoading } = useAppSelector(
    (state) => state.flightsSlices
  );
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchMyBookings(userId));
    }
  }, []);
  return (
    <Layout>
      <div className="bookings-parent-container">
        <div className="booking-title">My Bookings</div>
        {!flightBookings?.length && isLoading ? <SpinningLoader /> : null}
        {flightBookings &&
          flightBookings.map(
            ({
              _id,
              flight,
              fromDate,
              toDate,
              bookingClass,
              user,
              price,
              seatId,
              passengerDetails,
            }) => {
              return (
                <div className="bookings-container" key={_id}>
                  <div className="flight-icon">
                    <AirplanemodeActiveIcon />
                  </div>
                  <div className="location-container">
                    <div className="from-location">
                      {flight.sourceLocation}d
                    </div>
                    <div>
                      <ArrowRightAltIcon />
                    </div>
                    <div className="to-location">
                      {flight.destinationLocation}
                    </div>

                    <div className="trip-status">
                      {new Date(fromDate) < new Date() ? (
                        <span className="completed">(Completed)</span>
                      ) : (
                        <span className="upcoming">(Upcoming)</span>
                      )}
                    </div>
                  </div>
                  <div className="date-container">
                    <div className="flight-details-container">
                      <div className="brand-logo">
                        <img src={flight.brandLogo} />
                      </div>
                      <div className="brand-details">
                        <div>{flight.brand}</div>
                        <div>{flight.flightNo}</div>
                      </div>
                    </div>
                    <div className="from-date">
                      <div>From:</div>
                      <div>{new Date(fromDate).toDateString()}</div>
                      <div>{flight.sourceAirport}</div>
                    </div>
                    <div className="to-date">
                      <div>To:</div>
                      <div>{new Date(toDate).toDateString()}</div>
                      <div>{flight.destinationAirport}</div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </Layout>
  );
};

export default FlightBookings;
