import * as React from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../../../controller/slices/orders';
import OrderPending from './OrderList/OrderPending';

interface IStatusProps {}

const Status: React.FunctionComponent<IStatusProps> = (props) => {
  const orders = useSelector(getOrders);

  return (
    <main className='d-flex flex-column justify-content-evenly align-items-center py-2'>
      <h1>Pedidos pendientes</h1>
      <section className='scroll-view px-5'>
        {orders.map((order) => (
          <OrderPending key={order.table} order={order} />
        ))}
      </section>
    </main>
  );
};

export default Status;
