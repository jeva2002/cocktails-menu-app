import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../controller/slices/user';
import Nav from '../components/Dashboard/Nav/Nav';
import { Suspense, useEffect } from 'react';
import { getCocktailsAPI } from '../../controller/slices/cocktails';
import { createDailyAccount } from '../../controller/handlers/dashboard/accounts';
import { listenInventory } from '../../controller/handlers/dashboard/inventory';
import { Unsubscribe } from 'firebase/firestore';
const Dashboard: React.FunctionComponent = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCocktailsAPI());
    createDailyAccount();

    let unsub: Unsubscribe | undefined;
    listenInventory().then((res) => (unsub = res));

    return () => {
      if (unsub) unsub();
    };
  }, []);

  if (user.email === '' && user.username === '') return <Navigate to='/' />;
  return (
    <div className='main-container dashboard'>
      <Nav />
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Dashboard;
