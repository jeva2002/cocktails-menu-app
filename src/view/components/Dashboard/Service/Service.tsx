import { useState } from 'react';
import CreateOrder from './createOrder/CreateOrder';
import TablesList from './Tables/TablesList';

const Services: React.FunctionComponent = () => {
  const [currentView, setCurrentView] = useState('tables');
  const [selected, setSelected] = useState(0);

  return (
    <main className='container-fluid d-flex flex-column justify-content-evenly align-items-center py-3'>
      {currentView === 'tables' ? (
        <TablesList selected={selected} setSelected={setSelected} />
      ) : (
        <CreateOrder />
      )}
      <div className='d-flex gap-3'>
        {currentView !== 'tables' ? (
          <button
            className='btn btn-danger mt-2'
            onClick={() => setCurrentView('tables')}
          >
            Cancelar
          </button>
        ) : null}
        <button
          className='btn mt-2'
          onClick={() =>
            currentView === 'tables' ? setCurrentView('order') : {}
          }
        >
          Siguiente
        </button>
      </div>
    </main>
  );
};

export default Services;
