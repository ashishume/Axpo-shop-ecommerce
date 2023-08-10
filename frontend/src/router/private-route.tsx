import { Navigate } from 'react-router-dom';

function PrivateRoute({ isLoggedIn, children }: any) {
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  } else if (isLoggedIn === true) return children;
  else return null;
}
export default PrivateRoute;
