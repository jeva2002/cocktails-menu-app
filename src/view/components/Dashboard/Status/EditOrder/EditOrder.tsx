import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { trash } from '../../../../../assets/icons';
import {
  getOneOrder,
  Order,
  updateOrder,
} from '../../../../../controller/slices/orders';
import EditInput from './EditInput';
import './EditOrder.scss';

const EditOrder: React.FunctionComponent = () => {
  const { tableId } = useParams();
  const order = useSelector((state: { orders: Order[] }) =>
    getOneOrder(state, parseInt(tableId ?? ''))
  );
  const dispatch = useDispatch();

  const [newValue, setNewValue] = useState(
    Array.isArray(order?.order) ? order?.order : []
  );

  const deleteItem = (currentIndex: number) => {
    setNewValue(() => {
      if (newValue) {
        const value = [...newValue];
        value.splice(currentIndex, 1);
        return value;
      }
    });
  };

  return (
    <div className='p-4 d-flex flex-column align-items-center'>
      <h1>Editar pedido</h1>
      <form
        className='d-flex flex-column align-items-center'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            updateOrder({
              table: tableId ? parseInt(tableId) : -1,
              order: newValue
                ? newValue.filter((e) => e[0] !== '' && e[1] !== 0)
                : [],
            })
          );
        }}
      >
        <div className='scroll-view d-flex flex-column align-items-center gap-2'>
          {Array.isArray(newValue)
            ? newValue.map((cocktail, index) => (
                <div className='d-flex gap-3' key={index}>
                  <EditInput
                    index={index}
                    cocktail={cocktail}
                    setNewValue={setNewValue}
                  />
                  <img
                    className='click'
                    src={trash}
                    onClick={() => deleteItem(index)}
                  />
                </div>
              ))
            : null}
        </div>
        <div className='d-flex gap-2'>
          <button
            className='btn btn-danger'
            type='button'
            onClick={() =>
              setNewValue(() => {
                if (newValue) return [...newValue, ['', 0]];
              })
            }
          >
            Agregar
          </button>
          <button className='btn' type='submit'>
            Editar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
