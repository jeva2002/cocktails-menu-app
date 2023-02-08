import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../controller/slices/user';
import Nav from '../components/Dashboard/Nav/Nav';

const Dashboard: React.FunctionComponent = (props) => {
  const user = useSelector(selectUser);

  if (user.email === '' && user.username === '') return <Navigate to='/' />;
  return (
    <div className='main-container dashboard'>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Dashboard;
