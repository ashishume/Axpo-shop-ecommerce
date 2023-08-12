import { Navigate, Route, Routes } from 'react-router-dom';
import BookFlight from '../pages/Bookings/pages/BookFlight';
import SearchFlight from '../pages/Bookings/pages/SearchFlight';

const BookingRoutePaths = () => {
  return (
    <Routes>
      <Route path="/search-flight" element={<SearchFlight />} />
      <Route path="/book-flight" element={<BookFlight />} />
      <Route path="*" element={<Navigate to="/bookings/search-flight" />} />
    </Routes>
  );
};
export default BookingRoutePaths;
