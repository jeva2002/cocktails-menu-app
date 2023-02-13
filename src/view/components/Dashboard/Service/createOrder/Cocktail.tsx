import { useEffect, useState } from 'react';
import { Cocktail } from '../../../../../controller/slices/cocktails';

interface Props {
  cocktail: Cocktail;
  setOrder: React.Dispatch<React.SetStateAction<{}>>;
  shortage: boolean;
}

const Cocktail: React.FunctionComponent<Props> = ({
  cocktail,
  setOrder,
  shortage,
}) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setOrder(amount);
  }, [amount]);

  return (
    <article
      className='cocktail border p-2 mb-2 rounded'
      id={shortage ? 'pending' : ''}
    >
      <img src={cocktail.img} alt={cocktail.name} />
      <h3 className='h5 pt-2'>{cocktail.name}</h3>
      <div className='pb-2 d-flex align-items-center justify-content-evenly w-100'>
        <button
          className='cocktail-btn rounded-circle'
          disabled={amount === 0 || shortage}
          onClick={() => setAmount(amount - 1)}
        >
          -
        </button>
        <b>{amount}</b>
        <button
          disabled={shortage}
          className='cocktail-btn rounded-circle'
          onClick={() => setAmount(amount + 1)}
        >
          +
        </button>
      </div>
    </article>
  );
};

export default Cocktail;
