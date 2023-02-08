import { useState } from 'react';
import TablesList from './Tables/TablesList';

const Services: React.FunctionComponent = () => {
  const [currentView, setCurrentView] = useState('tables');
  const [selected, setSelected] = useState(0);

  return (
    <main className='container-fluid d-flex flex-column justify-content-evenly align-items-center py-3'>
      <h1>Seleccionar Mesa</h1>
      {currentView === 'tables' ? (
        <TablesList selected={selected} setSelected={setSelected} />
      ) : (
        <div>order </div>
      )}
      <div className='d-flex gap-3'>
        {currentView !== 'tables' ? (
          <button
            className='btn btn-danger mt-5'
            onClick={() => setCurrentView('tables')}
          >
            Cancelar
          </button>
        ) : null}
        <button
          className='btn mt-5'
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
