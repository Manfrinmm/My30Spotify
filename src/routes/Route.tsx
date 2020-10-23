import React from "react";
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from "react-router-dom";

import { useAuth } from "../hooks/auth";
import AuthLayout from "../styles/_layout/AuthLayout";
import DefaultLayout from "../styles/_layout/DefaultLayout";

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  if (user && !isPrivate) {
    return <Redirect to="/me" />;
  }

  if (!user && isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = user ? DefaultLayout : AuthLayout;

  return (
    <ReactDOMRoute
      {...rest}
      render={() => (
        <Layout>
          <Component />
        </Layout>
      )}
    />
  );
};

export default Route;
