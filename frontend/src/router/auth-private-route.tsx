import { Navigate } from 'react-router-dom';

function AuthPrivateRoute({ isLoggedIn, children }: any) {
  if (isLoggedIn === true) {
    return <Navigate to="/" replace />;
  } else if (isLoggedIn === false) return children;
  else return null;
}
export default AuthPrivateRoute;
