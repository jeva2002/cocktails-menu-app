import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
]);

export default router;
