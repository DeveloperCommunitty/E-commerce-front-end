import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { AdminRoutesPath, PrivateRoutesPath, RoutesPath } from './routespath';
import { PrivateRoute } from './PrivateRoutes';

export const RouterManager = () => {
  const adminRoutes = useMemo(
    () =>
      Object.keys(AdminRoutesPath).map((path) => {
        const RouteComponent = AdminRoutesPath[path];
        return (
          <Route
            key={path}
            element={<PrivateRoute requiredRole={["ADMIN"]} />}>
            <Route
              path={path}
              element={<RouteComponent />}
            />
          </Route>
        );
      }),
    []
  );

  const privateRoutes = useMemo(
    () =>
      Object.keys(PrivateRoutesPath).map((path) => {
        const RouteComponent = PrivateRoutesPath[path];
        return (
          <Route
            key={path}
            element={<PrivateRoute requiredRole={["USER", "ADMIN"]} />}>
            <Route
              path={path}
              element={<RouteComponent />}
            />
          </Route>
        );
      }),
    []
  );
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


  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes}
        {privateRoutes}
        {publicRoutes}
      </Routes>
    </BrowserRouter>
  );
};

