import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export function PrivateRoute({ children }) {
  const location = useLocation();
  const log = useSelector((state) => state.auth.token);
  if (!log) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return children;
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
