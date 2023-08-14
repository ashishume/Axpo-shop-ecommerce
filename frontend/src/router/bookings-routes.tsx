import { Navigate, Route, Routes } from 'react-router-dom';
import BookFlight from '../pages/Bookings/pages/BookFlight';
import SearchFlight from '../pages/Bookings/pages/SearchFlight';
import FlightBookings from '../pages/Bookings/pages/Bookings';

const BookingRoutePaths = () => {
  return (
    <Routes>
      <Route path="/search-flight" element={<SearchFlight />} />
      <Route path="/my-bookings" element={<FlightBookings />} />
      <Route path="/book-flight/:flightId/:fromDate" element={<BookFlight />} />
      <Route path="*" element={<Navigate to="/bookings/search-flight" />} />
    </Routes>
  );
};
export default BookingRoutePaths;
