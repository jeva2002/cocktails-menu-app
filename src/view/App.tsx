import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../model/store/store';

const App: React.FunctionComponent = (props) => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;
