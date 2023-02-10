import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../controller/slices/user';
import Nav from '../components/Dashboard/Nav/Nav';
import { useEffect } from 'react';
import { getCocktailsAPI } from '../../controller/slices/cocktails';
import { createDailyAccount } from '../../controller/handlers/dashboard/accounts';

const Dashboard: React.FunctionComponent = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCocktailsAPI());
    createDailyAccount();
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
