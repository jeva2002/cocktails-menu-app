import { useEffect, useState } from 'react';
import { dailyInventory } from '../../../../controller/handlers/dashboard/inventory';
import './Inventory.scss';

const InventoryReport: React.FunctionComponent = (props) => {
  const [avalaibleCocktails, setAvalaibleCocktails] = useState<
    [string, unknown][]
  >([]);

  useEffect(() => {
    dailyInventory().then((res: {}) => {
      setAvalaibleCocktails(Object.entries(res));
    });
  }, []);

  useEffect(() => {
    console.log(avalaibleCocktails);
    console.log(avalaibleCocktails.map((e) => Number(e[1])));
  }, [avalaibleCocktails]);

  return (
    <main className='inventory px-sm-5 px-1 py-2'>
      <h1 className='pt-2 text-center'>Bebidas disponibles</h1>
      <ul className='scroll-view inventory-list m-0'>
        {avalaibleCocktails.map((item) => (
          <li
            className='d-flex justify-content-around align-items-center'
            key={item[0]}
          >
            <span className='text-center'>{item[0]}</span>
            <span className='text-center'>{Number(item[1])}</span>
          </li>
        ))}
      </ul>
      <div className='d-flex justify-content-between border border-dark rounded position-relative mt-2 px-sm-5 px-1 py-2'>
        <span className='h4'>Bebidas disponibles</span>
        <span className='h4'>
          {avalaibleCocktails
            .map((item) => Number(item[1]))
            .reduce((accumulator, current) => accumulator + current)}
        </span>
      </div>
    </main>
  );
};

export default InventoryReport;
