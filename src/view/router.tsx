import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Dashboard, Login, Register } from './pages';
import {
  AddIngredient,
  Panel,
  InventoryReport,
  SalesReport,
} from './components/Dashboard/Admin';
import {
  Services,
  Orders,
  EditOrder,
  Bill,
  AccountsList,
} from './components/Dashboard/User';

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
            element: <AccountsList />,
          },
          {
            path: '/dashboard/account/:tableId',
            element: <Bill />,
          },
          {
            path: '/dashboard/sales',
            element: <SalesReport />,
          },
          {
            path: '/dashboard/inventory',
            element: <InventoryReport />,
          },
          {
            path: '/dashboard/add-ingredient',
            element: <AddIngredient />,
          },
          {
            path: '/dashboard/custom-cocktails',
            element: <Panel />,
          },
        ],
      },
    ],
  },
]);

export default router;
