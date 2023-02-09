import { Order } from '../../../../../controller/slices/orders';
import { arrowDown } from '../../../../../assets/icons/index';
import './OrderPending.scss';
import { useState } from 'react';

interface Props {
  order: Order;
}

const OrderPending: React.FunctionComponent<Props> = ({ order }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <article>
      <div className='p-3 bg-dark d-flex justify-content-between align-items-center'>
        <h3 className='h5 text-light'>Mesa {order.table}</h3>
        <img
          className='order-detail'
          src={arrowDown}
          alt='details'
          onClick={() => setShowDetail(!showDetail)}
        />
      </div>
      {showDetail ? (
        <ul className='border-start border-end pt-4 pb-2'>
          {Array.isArray(order.order)
            ? order.order.map((item) => (
                <li>
                  {item[0]} x {item[1]}{' '}
                </li>
              ))
            : null}
        </ul>
      ) : null}
    </article>
  );
};

export default OrderPending;
