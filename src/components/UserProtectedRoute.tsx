import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
interface UserProtectedRouteProps {
  children: React.ReactNode;
}
const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({
  children
}) => {
  const {
    isAuthenticated
  } = useUser();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export default UserProtectedRoute;