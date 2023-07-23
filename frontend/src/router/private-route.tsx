import { useEffect, useState } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { Axios } from "../services/http-service";

/** this implementation doesnt work */
function PrivateRoute({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {}, []);
  function isLoggedIn() {
    Axios.get("/validate")
      .then((response) => {
        const { iat, exp } = response.data;
        if (iat < exp) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        if (error.response?.status === 403 && error.response?.data?.message === "Invalid or expired token") {
        }
      });
    return isAuthenticated;
  }
  const location = useLocation();
  return isLoggedIn() ? <>{children}</> : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
}

export default PrivateRoute;
