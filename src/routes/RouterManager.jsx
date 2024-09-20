import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { RoutesPath } from './routespath';

export const RouterManager = () => {
  const publicRoutes = useMemo(
    () =>
      Object.keys(RoutesPath).map((path) => {
        const RouteComponent = RoutesPath[path];
        return (
          <Route
            key={path}
            path={path}
            element={<RouteComponent />}
          />
        );
      }),
    []
  );
  const routes = publicRoutes;

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};
