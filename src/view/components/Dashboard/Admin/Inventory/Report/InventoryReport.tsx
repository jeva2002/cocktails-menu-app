import { useEffect, useState } from 'react';
import {
  dailyInventory,
  getIngredients,
} from '../../../../../../controller/handlers/dashboard/inventory';
import { today } from '../../../../../../model/utils/dates';
import { revertCamelCase } from '../../../../../../model/utils/formatString';
import '../Inventory.scss';
import InventoryList from './InventoryList';

const InventoryReport: React.FunctionComponent = (props) => {
  const [list, setList] = useState<[string, unknown][]>([]);
  
  useEffect(() => {
    dailyInventory().then((res: {}) => {
      setList(Object.entries(res));
    });
  }, []);

  const getIngredientsInventory = () => {
    getIngredients().then((res: {}) => {
      const ingredients = Object.entries(res);
      ingredients.forEach((ingredient) => {
        ingredient[0] = revertCamelCase(ingredient[0]);
      });
      setList(ingredients);
    });
  };

  const getCocktailsInventory = () => {
    dailyInventory().then((res: {}) => {
      setList(Object.entries(res));
    });
  };

  return (
    <main className='inventory px-sm-5 px-1 py-3'>
      <div className='text-center'>
        <h2 className='h5'>{today}</h2>
      </div>
      <menu className='options d-flex justify-content-evenly'>
        <b onClick={getCocktailsInventory}>Bebidas</b>
        <b onClick={getIngredientsInventory}>Ingredientes</b>
      </menu>
      <InventoryList list={list} />
    </main>
  );
};

export default InventoryReport;
