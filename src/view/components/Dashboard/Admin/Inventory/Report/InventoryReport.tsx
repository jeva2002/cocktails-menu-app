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

  return (
    <main className='inventory px-sm-5 px-1 py-2'>
      <div className='text-center'>
        <h1>Inventario</h1>
        <h2 className='h5'>{today}</h2>
      </div>
      <menu className='options d-flex justify-content-evenly'>
        <b
          onClick={() => {
            dailyInventory().then((res: {}) => {
              setList(Object.entries(res));
            });
          }}
        >
          Bebidas
        </b>
        <b
          onClick={() => {
            getIngredients().then((res: {}) => {
              const ingredients = Object.entries(res);
              ingredients.forEach((ingredient) => {
                ingredient[0] = revertCamelCase(ingredient[0]);
              });
              setList(ingredients);
            });
          }}
        >
          Ingredientes
        </b>
      </menu>
      <InventoryList list={list} />
    </main>
  );
};

export default InventoryReport;
