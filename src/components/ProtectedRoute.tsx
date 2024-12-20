import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  const { authed, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <div>Loading</div>;
  }

  return authed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export { ProtectedRoute };
