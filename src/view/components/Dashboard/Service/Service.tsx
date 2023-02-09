import { useEffect, useState } from 'react';
import CreateOrder from './createOrder/CreateOrder';
import TablesList from './Tables/TablesList';
import { Order, addOrder } from '../../../../controller/slices/orders';
import { useDispatch } from 'react-redux';
import { formatOrder } from '../../../../model/utils/FormatData';

const Services: React.FunctionComponent = () => {
  const [currentView, setCurrentView] = useState('tables');
  const [selected, setSelected] = useState(1);
  const [order, setOrder] = useState<Order>({
    table: selected,
    order: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setOrder({ ...order, table: selected });
  }, [selected]);

  return (
    <main className='container-fluid d-flex flex-column justify-content-evenly align-items-center py-3'>
      {currentView === 'tables' ? (
        <TablesList selected={selected} setSelected={setSelected} />
      ) : (
        <CreateOrder setOrder={setOrder} />
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
            currentView === 'tables'
              ? setCurrentView('order')
              : dispatch(addOrder(formatOrder(order))) &&
                setCurrentView('tables')
          }
        >
          {currentView === 'tables' ? 'Siguiente' : 'Confirmar'}
        </button>
      </div>
    </main>
  );
};

export default Services;
