import { Order } from '../../../../../../controller/slices/orders';
import { arrowDown, trash } from '../../../../../../assets/icons/index';
import './OrderList.scss';
import { useState } from 'react';
import { edit } from '../../../../../../assets/icons/index';
import { Link } from 'react-router-dom';

interface Props {
  order: Order;
  deleteOrder: (tableId: number) => void;
}

const OrderList: React.FunctionComponent<Props> = ({ order, deleteOrder }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <article>
      <div className='p-3 bg-dark d-flex justify-content-between align-items-center'>
        <h3 className='h5 text-light'>Mesa {order.table}</h3>
        <div className='d-flex gap-4'>
          <img
            className='order-detail'
            src={arrowDown}
            alt='details'
            onClick={() => setShowDetail(!showDetail)}
          />
          <img
            className='order-detail'
            src={trash}
            alt='delete order'
            onClick={() => deleteOrder(order.table)}
          />
        </div>
      </div>
      {showDetail ? (
        <ul className='border-start border-end pt-4 pb-2'>
          {Array.isArray(order.order)
            ? order.order.map((item, index) => (
                <li
                  key={index}
                  className='md:px-5 px-1 d-flex justify-content-between'
                >
                  {item[0]} x {item[1]}
                  {index === 0 ? (
                    <Link
                      className='click'
                      to={`/dashboard/status/${order.table}`}
                    >
                      <img className='pe-2' src={edit} alt='Edit content' />
                    </Link>
                  ) : null}
                </li>
              ))
            : null}
        </ul>
      ) : null}
    </article>
  );
};

export default OrderList;
