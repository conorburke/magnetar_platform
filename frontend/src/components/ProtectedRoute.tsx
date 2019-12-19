import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import AuthError from './AuthError';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component?: any;
  authenticationPath: string;
  restrictedPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  if (!props.isAuthenticated) {
    return (
      <Route
        exact
        path={props.restrictedPath}
        component={AuthError}
        render={undefined}
      />
    );
  } else {
    return (
      <Route exact path={props.restrictedPath} component={props.component} />
    );
  }
};

export default ProtectedRoute;
