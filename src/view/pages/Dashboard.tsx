import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../controller/slices/user';
import Nav from '../components/Dashboard/Nav/Nav';
import { useEffect } from 'react';
import {
  getCocktailsAPI,
  getCocktailsContext,
} from '../../controller/slices/cocktails';

const Dashboard: React.FunctionComponent = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCocktailsAPI());
  }, []);

  if (user.email === '' && user.username === '') return <Navigate to='/' />;
  return (
    <div className='main-container dashboard'>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Dashboard;
