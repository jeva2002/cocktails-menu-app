import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AccountsList from './components/Dashboard/Account/AccountsList';
import Bill from './components/Dashboard/Account/Bill';
import Panel from './components/Dashboard/customCocktail/Panel';
import AddIngredient from './components/Dashboard/Inventory/AddIngredient/AddIngredient';
import InventoryReport from './components/Dashboard/Inventory/Report/InventoryReport';
import SalesReport from './components/Dashboard/SalesReport/SalesReport';
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
