
import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider, useAuth } from './hooks/AuthProvider';
import { HomeLayout, GuestLayout } from './layouts';
import { PublicRoutes, PrivateRoutes } from './router/route';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          {PublicRoutes.map((route, index) => {

            let Layout: React.ComponentType<{ children: ReactNode }> = GuestLayout;

            if (route.layout !== undefined) {
              Layout = route.layout ?? Fragment;
            }

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* Private Routes */}
          {PrivateRoutes.map((route, index) => {
            // Default layout cho private: HomeLayout (có header đầy đủ)
            let Layout: React.ComponentType<{ children: ReactNode }> = HomeLayout;

            if (route.layout !== undefined) {
              Layout = route.layout ?? Fragment;
            }

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;