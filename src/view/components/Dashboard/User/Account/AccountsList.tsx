import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../../../../../controller/slices/orders';

const AccountsList: React.FunctionComponent = () => {
  const orders = useSelector(getOrders);

  return (
    <main className='d-flex flex-column align-items-center justify-content-evenly'>
      <h1 className='mt-3 mb-0'>Cuentas Pendientes</h1>
      <ul className='scroll-view d-flex flex-column justify-content-center w-100'>
        {orders.length ? (
          orders.map((e, index) => (
            <li
              key={index}
              className='mt-0 d-flex p-2 justify-content-between align-items-center border-top border-bottom sm:mx-5 w-100'
            >
              <b className='h4'>Mesa {e.table}</b>
              <Link to={`/dashboard/account/${e.table}`}>
                <button className='btn btn-danger mb-3'>Pagar</button>
              </Link>
            </li>
          ))
        ) : (
          <div className='d-flex flex-column justify-content-center align-items-center w-100 text-center border border-dark rounded p-5'>
            <h3 className='p-5'>
              En el momento no hay ninguna cuenta pendiente, regresa cuando se
              haya hecho algún pedido.
            </h3>
          </div>
        )}
      </ul>
    </main>
  );
};

export default AccountsList;
