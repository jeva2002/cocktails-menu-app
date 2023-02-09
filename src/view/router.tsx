import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Services from './components/Dashboard/Service/Service';
import Status from './components/Dashboard/Status/Status';
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
            element: <Status />,
          },
        ],
      },
    ],
  },
]);

export default router;
