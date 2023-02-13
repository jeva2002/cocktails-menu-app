import { useEffect, useState } from 'react';
import { deleteCustomCocktail } from '../../../../../../controller/handlers/dashboard/customCocktails';
import { Cocktail } from '../../../../../../controller/slices/cocktails';
import { capitalize } from '../../../../../../model/utils/formatString';

interface IDeleteCocktailProps {
  customCocktails: {};
}

const DeleteCocktail: React.FunctionComponent<IDeleteCocktailProps> = ({
  customCocktails,
}) => {
  const [list, setList] = useState<[string, any][]>([]);
  const [cocktail, setCocktail] = useState('');

  useEffect(() => {
    if (typeof customCocktails === 'object')
      setList(Object.entries(customCocktails));
  }, []);

  useEffect(() => {
    if (list.length > 0) setCocktail(list[0][1].name);
    else setCocktail('');
  }, [list]);

  return (
    <form
      className='pt-5 select h-50 d-flex flex-column align-items-center justify-content-baseline gap-4'
      onSubmit={async (e) => {
        e.preventDefault();
        if (cocktail !== '') {
          const filteredList = list.filter((item) => item[1].name !== cocktail);
          await deleteCustomCocktail(Object.fromEntries(filteredList));
          setList(filteredList);
        }
      }}
    >
      <select value={cocktail} onChange={(e) => setCocktail(e.target.value)}>
        {list.map((item: [string, Cocktail]) => (
          <option key={item[1].name} value={item[1].name}>
            {capitalize(item[1].name)}
          </option>
        ))}
      </select>
      <button className='btn btn-danger' type='submit'>
        Eliminar
      </button>
      <p className='w-75'>
        Recuerda que al eliminar un producto este no se podrá recuperar
      </p>
    </form>
  );
};

export default DeleteCocktail;
