import { Account } from '../controller/handlers/dashboard/accounts';
import { formatSales } from '../model/utils/formatData';

test('Get daily account and return an array of objects with the number of the table and the total sales for that table', () => {
  const sales: Account = {
    secondTable: 325,
    fourthTable: 725,
    thirdTable: 525,
    sixthTable: 1125,
    fifthTable: 925,
    firstTable: 125,
  };

  expect(formatSales(sales)).toEqual([
    { table: 1, total: 125 },
    { table: 2, total: 325 },
    { table: 3, total: 525 },
    { table: 4, total: 725 },
    { table: 5, total: 925 },
    { table: 6, total: 1125 },
  ]);
});
