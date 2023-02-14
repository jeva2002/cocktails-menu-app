import { x } from '../../../../../../assets/icons';
import { revertCamelCase } from '../../../../../../model/utils/formatString'; 

interface Props {
  name: string;
  amount: number;
  id: number;
  setIngredients: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          amount: number;
        }[]
      | undefined
    >
  >;
}

const Badget: React.FunctionComponent<Props> = ({
  name,
  amount,
  id,
  setIngredients,
}) => {
  const increase = () => {
    setIngredients((ingredients) => {
      if (ingredients) {
        const list = [...ingredients];
        list[id].amount = amount + 1;
        return list;
      }
    });
  };
  const decrease = () => {
    setIngredients((ingredients) => {
      if (ingredients) {
        const list = [...ingredients];
        list[id].amount = amount - 1;
        return list;
      }
    });
  };
  const remove = () => {
    setIngredients((ingredients) => {
      if (ingredients) {
        return ingredients.filter((ingredient, index) => index !== id);
      }
    });
  };

  return (
    <div className='item d-flex justify-content-evenly'>
      <div className='d-flex flex-column align-items-center'>
        <span className='h6'>{revertCamelCase(name)}</span>
        <div className='d-flex align-items-center gap-3'>
          <span
            className='h5 click text-warning'
            onClick={() => {
              if (amount > 0) decrease();
            }}
          >
            -
          </span>
          <span className='h6'>{amount}</span>
          <span className='h5 click text-primary' onClick={increase}>
            +
          </span>
        </div>
      </div>
      <img
        className='click text-secondary'
        src={x}
        alt='eliminar'
        onClick={remove}
      />
    </div>
  );
};

export default Badget;
