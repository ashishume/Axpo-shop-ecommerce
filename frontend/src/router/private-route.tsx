import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { IsLoggedIn } from '.';
import SpinningLoader from '../components/SpinningLoader';

const PrivateRoute = () => {
  const isAuthenticated = useContext(IsLoggedIn);
  if (isAuthenticated === null) {
    // Render a loading indicator or handle the situation accordingly
    return <SpinningLoader />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;

// this is the other way to create private route
// function PrivateRoute({ isLoggedIn, children }: any) {
//   if (isLoggedIn === false) {
//     return <Navigate to="/login" replace />;
//   } else if (isLoggedIn === true) return children;
//   else return null;
// }
