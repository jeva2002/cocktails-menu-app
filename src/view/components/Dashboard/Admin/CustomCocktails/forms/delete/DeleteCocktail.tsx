import { useEffect, useState } from 'react';
import {
  deleteCustomCocktail,
  getCustomCocktails,
} from '../../../../../../../controller/handlers/dashboard/customCokctail/customCocktails';
import { Cocktail } from '../../../../../../../controller/slices/cocktails';
import { capitalize } from '../../../../../../../model/utils/formatString';

const DeleteCocktail: React.FunctionComponent = ({}) => {
  const [list, setList] = useState<[string, any][]>([]);
  const [cocktail, setCocktail] = useState('');

  useEffect(() => {
    getCustomCocktails().then((res) => {
      if (res) setList(Object.entries(res));
    });
  }, []);

  useEffect(() => {
    if (list.length > 0) setCocktail(list[0][1].name);
    else setCocktail('');
  }, [list]);

  return (
    <form
      className='select h-100 w-100 d-flex flex-column align-items-center justify-content-center gap-4'
      onSubmit={async (e) => {
        e.preventDefault();
        if (cocktail !== '') {
          const filteredList = list.filter((item) => item[1].name !== cocktail);
          await deleteCustomCocktail(Object.fromEntries(filteredList), () =>
            setList(filteredList)
          );
        }
      }}
    >
      <h2 className='mb-4 pb-1 text-center'>Eliminar bebida</h2>
      <select value={cocktail} onChange={(e) => setCocktail(e.target.value)}>
        {list.length ? (
          list.map((item: [string, Cocktail]) => (
            <option key={item[1].name} value={item[1].name}>
              {capitalize(item[1].name)}
            </option>
          ))
        ) : (
          <option value=''>Sin bebidas personalizadas</option>
        )}
      </select>
      <button className='btn btn-danger' type='submit'>
        Eliminar
      </button>
      <p className='w-50'>
        Recuerda que al eliminar un producto este no se podrá recuperar
      </p>
    </form>
  );
};

export default DeleteCocktail;
