import { x } from '../../../../../../assets/icons';
import { modifyBadget } from '../../../../../../controller/handlers/dashboard/customCokctail/badget';
import { revertCamelCase } from '../../../../../../model/utils/formatString';
import { SetIngredients } from '../types';

interface Props {
  name: string;
  amount: number;
  id: number;
  setIngredients: SetIngredients;
}

const Badget: React.FunctionComponent<Props> = ({
  name,
  amount,
  id,
  setIngredients,
}) => {
  return (
    <div className='item d-flex justify-content-evenly'>
      <div className='d-flex flex-column align-items-center'>
        <span className='h6'>{revertCamelCase(name)}</span>
        <div className='d-flex align-items-center gap-3'>
          <span
            className='h5 click text-warning'
            onClick={() => {
              if (amount > 0)
                modifyBadget('reduce', setIngredients, id, amount);
            }}
          >
            -
          </span>
          <span className='h6'>{amount}</span>
          <span
            className='h5 click text-primary'
            onClick={() => modifyBadget('add', setIngredients, id, amount)}
          >
            +
          </span>
        </div>
      </div>
      <img
        className='click text-secondary'
        src={x}
        alt='eliminar'
        onClick={() => modifyBadget('remove', setIngredients, id, amount)}
      />
    </div>
  );
};

export default Badget;
