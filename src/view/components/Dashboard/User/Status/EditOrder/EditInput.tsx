import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCocktailsContext } from '../../../../../../controller/slices/cocktails';

interface Input {
  index: number;
  cocktail: any[];
  setNewValue: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}

const EditInput: React.FunctionComponent<Input> = ({
  cocktail,
  setNewValue,
  index,
}) => {
  const cocktails = useSelector(getCocktailsContext);
  const [newCocktail, setNewCocktail] = useState(cocktail[0]);
  const [newAmount, setNewAmount] = useState(cocktail[1]);

  useEffect(() => {
    setNewValue((prev) => {
      if (prev) {
        const newValue = [...prev];
        newValue[index] = [newCocktail, parseInt(newAmount)];
        return newValue;
      }
    });
  }, [newCocktail, newAmount]);

  return (
    <div className='d-flex gap-2'>
      <input
        className='amount-input rounded border p-2 ps-3 text-center'
        value={newAmount >= 0 ? newAmount : 0}
        type='number'
        onChange={(e) => setNewAmount(e.currentTarget.value)}
      />
      <select
        className='name-input  rounded border p-2 px-4 text-center'
        value={newCocktail}
        onChange={(e) => setNewCocktail(e.currentTarget.value)}
      >
        <option value={cocktail[0]}>{cocktail[0]}</option>
        {cocktails
          .filter((e) => e.name !== cocktail[0])
          .map((e, index) => (
            <option key={index} value={e.name}>
              {e.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default EditInput;
