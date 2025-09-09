import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');

  return isAuthenticated === 'true' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
