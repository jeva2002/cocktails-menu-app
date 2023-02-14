import { useDispatch, useSelector } from 'react-redux';
import { handleConfirm } from '../../../../../../controller/handlers/responses';
import {
  getOrders,
  removeOrder,
} from '../../../../../../controller/slices/orders';
import OrderPending from './OrderList';

const Orders: React.FunctionComponent = () => {
  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  const deleteOrder = (tableId: number) => {
    handleConfirm(() => dispatch(removeOrder(tableId)))
  };

  return (
    <main className='d-flex flex-column justify-content-evenly align-items-center py-2'>
      <h1 className='mt-3'>Pedidos pendientes</h1>
      <section className='scroll-view px-5'>
        {orders.map((order) => (
          <OrderPending
            key={order.table}
            order={order}
            deleteOrder={deleteOrder}
          />
        ))}
      </section>
    </main>
  );
};

export default Orders;
