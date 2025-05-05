import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../redux/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);
  const from = location.state?.from || '/';

  if (onlyUnAuth && isLoggedIn) {
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
