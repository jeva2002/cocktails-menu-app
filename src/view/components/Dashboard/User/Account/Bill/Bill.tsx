import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  handlePay,
  Tables,
} from '../../../../../../controller/handlers/dashboard/accounts';
import {
  Cocktail,
  getOneCocktail,
} from '../../../../../../controller/slices/cocktails';
import {
  getOneOrder,
  Order,
  removeOrder,
} from '../../../../../../controller/slices/orders';
import { formatPrice } from '../../../../../../model/utils/formatString';
import { getTotal } from '../../../../../../controller/handlers/dashboard/bill';
import BillItem from './BillItem';
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

  const dispatch = useDispatch();

  return (
    <main className='d-flex flex-column align-items-center'>
      <h1 className='mt-4'>Factura Mesa {tableId}</h1>
      <ul className='bill-list scroll-view'>
        {cocktailsList?.map((cocktail, index) => (
          <BillItem key={index} cocktail={cocktail} />
        ))}
      </ul>
      <div className='total'>
        <h3>Total:</h3>
        <h3>${' ' + formatPrice(total)}</h3>
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
          onClick={async () => {
            navigate('/dashboard/');
            await handlePay(
              Tables[tableId ? parseInt(tableId) - 1 : 0],
              cocktailsList?.map((item) => {
                return item?.ingredients;
              }) ?? [],
              total ?? 0
            );
            dispatch(removeOrder(parseInt(tableId ?? '0')));
          }}
        >
          Pagar
        </button>
      </div>
    </main>
  );
};

export default Bill;
