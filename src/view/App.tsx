import { Outlet } from 'react-router-dom';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className='App'>
      <Outlet />
    </div>
  );
};

export default App;
