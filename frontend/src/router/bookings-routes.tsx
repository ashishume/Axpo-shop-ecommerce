import { Navigate, Route, Routes } from 'react-router-dom';
import BookFlight from '../pages/Bookings/pages/BookFlight';

const BookingRoutePaths = () => {
  return (
    <Routes>
      <Route path="/book-flight" element={<BookFlight />} />
      <Route path="*" element={<Navigate to="/bookings/book-flight" />} />
    </Routes>
  );
};
export default BookingRoutePaths;
