import { useEffect, useState } from 'react';
import {
  Account,
  dailyAccount,
  Tables,
} from '../../../../controller/handlers/dashboard/accounts';
import { today } from '../../../../model/utils/dates';
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
    <main className='sales sm:px-5 px-0 py-3 d-flex flex-column justify-content-between align-items-center gap-4'>
      <div>
        <h1>Ventas Por Mesa</h1>
        <small className='h5'>{today}</small>
      </div>
      {sales && (
        <ul className='w-75 w-sm-100 sales-list'>
          {formatSales()?.map((sale) => (
            <li
              className='h4 py-1 px-sm-5 px-0 d-flex align-items-center'
              key={sale?.table}
            >
              <span className='col-6'>Mesa {sale?.table}</span>
              <span className='col-6'>${' ' + sale?.total}</span>
            </li>
          ))}
        </ul>
      )}
      <div className='w-75 w-sm-100 px-sm-5 px-0 py-1 d-flex justify-content-between align-items-center border border-dark rounded'>
        <h2>Ventas totales:</h2>
        <span className='h3'>
          ${'  '}
          {formatSales()
            ?.map((sale) => sale?.total)
            ?.reduce(
              (accumulator, currentValue) => accumulator + currentValue
            ) ?? 0}
        </span>
      </div>
    </main>
  );
};

export default SalesReport;
