import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Cocktail,
  getOneCocktail,
} from '../../../../controller/slices/cocktails';
import { getOneOrder, Order } from '../../../../controller/slices/orders';
import { getTotal } from '../../../../model/utils/FormatData';
import './Bill.scss';

const Bill: React.FunctionComponent = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const order = useSelector((state: { orders: Order[] }) =>
    getOneOrder(state, parseInt(tableId ?? ''))
  );
  const cocktailsList = order?.order.map((e) => {
    const cocktail = useSelector((state: { cocktails: Cocktail[] }) =>
      getOneCocktail(state, e[0])
    );
    if (cocktail) return { ...cocktail, amount: e[1] };
  });

  const total = getTotal(
    cocktailsList?.map(
      (e) => parseInt(`${e?.amount}`) * parseInt(`${e?.price}`)
    )
  );

  return (
    <main className='d-flex flex-column align-items-center'>
      <h1 className='mt-4'>Factura Mesa {tableId}</h1>
      <ul className='bill-list scroll-view'>
        {cocktailsList?.map((e, index) => (
          <li className='item' key={index}>
            <img src={e?.img} alt={e?.name} />
            <div>
              <small>{e?.name}</small>
              <b>c/u $ {e?.price}</b>
            </div>
            <div>
              <small>Cantidad: {e?.amount}</small>
              <b>
                Total: ${' '}
                {e?.amount && e.price
                  ? parseInt(`${e?.amount}`) * e?.price
                  : null}
              </b>
            </div>
          </li>
        ))}
      </ul>
      <div className='total'>
        <h3>Total:</h3>
        <h3>${' ' + total}</h3>
      </div>
      <div className='d-flex gap-3'>
        <button
          className='btn btn-danger'
          onClick={() => navigate('/dashboard/account')}
        >
          Cancelar
        </button>
        <button
          className='btn'
          onClick={() => {
            navigate('/dashboard/account');
          }}
        >
          Pagar
        </button>
      </div>
    </main>
  );
};

export default Bill;
