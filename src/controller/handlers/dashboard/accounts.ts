import {
  createDocument,
  getDocument,
  updateDocument,
} from '../../../model/firebase/firestore';
import { today } from '../../../model/utils/dates';

export interface Account {
  firstTable?: number;
  secondTable?: number;
  thirdTable?: number;
  fourthTable?: number;
  fifthTable?: number;
  sixthTable?: number;
}

export enum Tables {
  'firstTable',
  'secondTable',
  'thirdTable',
  'fourthTable',
  'fifthTable',
  'sixthTable',
  'seventhTable',
  'eighthTable',
}

const newAccount: Account = {
  firstTable: 0,
  secondTable: 0,
  thirdTable: 0,
  fourthTable: 0,
  fifthTable: 0,
  sixthTable: 0,
};

export const dailyAccount: any = async () =>
  await getDocument('accounts/' + today);

export const createDailyAccount = async () => {
  try {
    const account = await dailyAccount();
    if (account?.firstTable === undefined) {
      const newDoc = await createDocument(newAccount, 'accounts', today);
      return newDoc;
    }
  } catch (error) {
    console.error(error);
  }
};

export const handlePay = async (table: string, total: number) => {
  try {
    const account = await dailyAccount();
    account[table] = account[table] + total;
    return await updateDocument(account, 'accounts', today);
  } catch (error) {
    console.error(error);
  }
};
