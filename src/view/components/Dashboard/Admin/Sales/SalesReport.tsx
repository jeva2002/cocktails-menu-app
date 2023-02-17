import { useEffect, useState } from 'react';
import {
  Account,
  getHistoryAccounts,
} from '../../../../../controller/handlers/dashboard/accounts';
import { formatSales } from '../../../../../model/utils/formatData';
import { formatPrice } from '../../../../../model/utils/formatString';
import './SalesReport.scss';
import SelectHistory from './SelectHistory';

const SalesReport: React.FunctionComponent = () => {
  const [sales, setSales] = useState<Account>();
  const [history, setHistory] = useState<Account[]>();

  useEffect(() => {
    getHistoryAccounts().then((res: Account[]) => {
      setSales(res.at(-1));
      setHistory(res);
    });
  }, []);

  return (
    <main className='sales px-sm-5 px-0 py-3 d-flex flex-column justify-content-between align-items-center gap-4'>
      <div className='d-flex flex-column align-items-center'>
        <h1>Ventas Por Mesa</h1>
        <SelectHistory
          setSales={setSales}
          history={history ?? []}
          options={history?.map((item: Account) => item.id ?? item.id) ?? []}
        />
      </div>
      {sales && (
        <ul className='w-100 pe-4 sales-list'>
          {formatSales(sales ?? 0)?.map((sale, index) => (
            <li
              key={index}
              className='d-flex justify-content-between h4 py-1 px-sm-5 px-2 d-flex align-items-center'
            >
              <span>Mesa {sale?.table}</span>
              <span>${' ' + formatPrice(sale?.total ?? 0)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className='w-sm-75 w-100 w-sm-100 px-sm-5 px-2 py-1 d-flex justify-content-between align-items-center border border-dark rounded'>
        <h2>Ventas totales:</h2>
        <span className='h3'>
          ${'  '}
          {formatPrice(
            formatSales(sales)
              ?.map((sale) => sale?.total)
              ?.reduce(
                (accumulator, currentValue) => accumulator + currentValue
              ) ?? 0
          ) ?? 0}
        </span>
      </div>
    </main>
  );
};

export default SalesReport;
