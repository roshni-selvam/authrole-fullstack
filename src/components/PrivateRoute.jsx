import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, hasRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;