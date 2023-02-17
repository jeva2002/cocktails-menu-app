import { useDispatch, useSelector } from 'react-redux';
import { handleConfirm } from '../../../../../../controller/handlers/responses';
import {
  getOrders,
  removeOrder,
} from '../../../../../../controller/slices/orders';
import OrderList from './OrderList';

const Orders: React.FunctionComponent = () => {
  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  const deleteOrder = (tableId: number) => {
    handleConfirm(() => dispatch(removeOrder(tableId)));
  };

  return (
    <main className='d-flex flex-column justify-content-evenly align-items-center py-2'>
      <h1 className='mt-3'>Pedidos pendientes</h1>
      <section className='scroll-view px-5 d-flex flex-column justify-content-center w-100'>
        {orders.length ? (
          orders.map((order) => (
            <OrderList
              key={order.table}
              order={order}
              deleteOrder={deleteOrder}
            />
          ))
        ) : (
          <div className='d-flex flex-column justify-content-center align-items-center w-100 text-center border border-dark rounded p-5'>
            <h3 className='p-5'>
              En el momento no hay ningún pedido en curso, regresa cuando se
              haya hecho alguno.
            </h3>
          </div>
        )}
      </section>
    </main>
  );
};

export default Orders;
