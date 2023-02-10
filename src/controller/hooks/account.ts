import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handlePay, Tables } from '../handlers/dashboard/accounts';
import { removeOrder } from '../slices/orders';

export const useHandlePay = async (tableId: string | undefined, total: number) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  navigate('/dashboard/');
  await handlePay(Tables[tableId ? parseInt(tableId) - 1 : 0], total ?? 0);
  dispatch(removeOrder(parseInt(tableId ?? '0')));
};
