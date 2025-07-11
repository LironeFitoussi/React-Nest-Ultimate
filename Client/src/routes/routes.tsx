import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

// Layouts
import Layout from './_layout';

// Routes
import HomeRoute from './HomeRoute';
import AuthRoute from './AuthRoute';
import ErrorPage from './ErrorPage';
import DashboardRoute from '@/routes/DashboardRoute';
import TestRoute from '@/routes/TestRoute';

// Loaders
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute element={<DashboardRoute />} />,
      },
      {
        path: 'test',
        element: <ProtectedRoute element={<TestRoute />} />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthRoute />,
  },
]);
