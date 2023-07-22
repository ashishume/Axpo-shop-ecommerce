import { Navigate, Route, useLocation } from "react-router-dom";

function PrivateRoute({ children }: any) {
  const isAuthenticated = true;
  const location = useLocation();
  return isAuthenticated ? <>{children}</> : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
}

export default PrivateRoute;
