import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Services from './components/Dashboard/Service/Service';
import EditOrder from './components/Dashboard/Status/EditOrder/EditOrder';
import Orders from './components/Dashboard/Status/OrderList/Orders';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/',
            element: <Services />,
          },
          {
            path: '/dashboard/status',
            element: <Orders />,
          },
          {
            path: '/dashboard/status/:tableId',
            element: <EditOrder />,
          },
          {
            path: '/dashboard/account/',
            element: <EditOrder />,
          },
          {
            path: '/dashboard/account/:tableId',
            element: <EditOrder />,
          },
        ],
      },
    ],
  },
]);

export default router;
