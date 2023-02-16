import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
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
import Error from './pages/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<Error />}>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route index element={<Services />} />
        <Route path='status' element={<Orders />} />
        <Route path='status/:tableId' element={<EditOrder />} />
        <Route path='account/' element={<AccountsList />} />
        <Route path='account/:tableId' element={<Bill />} />
        <Route path='sales' element={<SalesReport />} />
        <Route path='inventory' element={<InventoryReport />} />
        <Route path='add-ingredient' element={<AddIngredient />} />
        <Route path='custom-cocktails' element={<Panel />} />
      </Route>
    </Route>
  )
);

export default router;

// [
//   {
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: '/',
//         element: <Login />,
//       },
//       {
//         path: '/register',
//         element: <Register />,
//       },
//       {
//         path: '/dashboard',
//         element: <Dashboard />,
//         children: [
//           {
//             path: '/dashboard/',
//             element: <Services />,
//           },
//           {
//             path: '/dashboard/status',
//             element: <Orders />,
//           },
//           {
//             path: '/dashboard/status/:tableId',
//             element: <EditOrder />,
//           },
//           {
//             path: '/dashboard/account/',
//             element: <AccountsList />,
//           },
//           {
//             path: '/dashboard/account/:tableId',
//             element: <Bill />,
//           },
//           {
//             path: '/dashboard/sales',
//             element: <SalesReport />,
//           },
//           {
//             path: '/dashboard/inventory',
//             element: <InventoryReport />,
//           },
//           {
//             path: '/dashboard/add-ingredient',
//             element: <AddIngredient />,
//           },
//           {
//             path: '/dashboard/custom-cocktails',
//             element: <Panel />,
//           },
//         ],
//       },
//     ],
//   },
// ]
