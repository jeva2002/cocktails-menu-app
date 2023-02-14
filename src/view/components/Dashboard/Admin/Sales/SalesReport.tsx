import { useEffect, useState } from 'react';
import {
  Account,
  dailyAccount,
  Tables,
} from '../../../../../controller/handlers/dashboard/accounts';
import { today } from '../../../../../model/utils/dates';
import { formatPrice } from '../../../../../model/utils/formatString';
import './SalesReport.scss';

const SalesReport: React.FunctionComponent = () => {
  const [sales, setSales] = useState<Account>();

  useEffect(() => {
    dailyAccount().then((res: Account) => {
      setSales(res);
    });
  }, []);

  const formatSales = () => {
    if (sales) {
      return Object.entries(sales)
        .map((sale) => {
          for (let table in Tables) {
            if (sale[0] === table)
              return { table: parseInt(Tables[table]) + 1, total: sale[1] };
          }
        })
        .sort((a, b) => {
          if (a?.table && b?.table) return a.table - b.table;
          else return 0;
        });
    }
  };

  return (
    <main className='sales px-sm-5 px-0 py-3 d-flex flex-column justify-content-between align-items-center gap-4'>
      <div>
        <h1>Ventas Por Mesa</h1>
        <small className='h5'>{today}</small>
      </div>
      {sales && (
        <ul className='w-100 pe-4 sales-list'>
          {formatSales()?.map((sale) => (
            <li
              className='d-flex justify-content-between h4 py-1 px-sm-5 px-2 d-flex align-items-center'
              key={sale?.table}
            >
              <span>Mesa {sale?.table}</span>
              <span>${' ' + formatPrice(sale?.total)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className='w-sm-75 w-100 w-sm-100 px-sm-5 px-2 py-1 d-flex justify-content-between align-items-center border border-dark rounded'>
        <h2>Ventas totales:</h2>
        <span className='h3'>
          ${'  '}
          {formatPrice(
            formatSales()
              ?.map((sale) => sale?.total)
              ?.reduce(
                (accumulator, currentValue) => accumulator + currentValue
              )
          ) ?? 0}
        </span>
      </div>
    </main>
  );
};

export default SalesReport;
