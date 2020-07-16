import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (currentUser && !currentUser.emailVerified) {
          return <Redirect to={"/verify-email"} />
        } else if (currentUser && currentUser.emailVerified) {
          return <RouteComponent {...routeProps} />
        } else {
          return <Redirect to={"/login"} />
        }
      }
      }
    />
  );
};


export default PrivateRoute