import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../../../../controller/slices/orders';

const AccountsList: React.FunctionComponent = () => {
  const orders = useSelector(getOrders);

  return (
    <main className='d-flex flex-column align-items-center justify-content-evenly'>
      <h1 className='mt-3 mb-0'>Cuentas Pendientes</h1>
      <ul className='scroll-view'>
        {orders.map((e, index) => (
          <li
            key={index}
            className='d-flex p-2 justify-content-between align-items-center border-top border-bottom sm:mx-5'
          >
            <b className='h4'>Mesa {e.table}</b>
            <Link to={`/dashboard/account/${e.table}`}>
              <button className='btn btn-danger mb-3'>Pagar</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AccountsList;
