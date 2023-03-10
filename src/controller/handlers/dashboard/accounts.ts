import {
  accountsCollection,
  createDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
} from '../../../model/firebase/firestore';
import { today } from '../../../model/utils/dates';
import { handleError, handleSuccess } from '../responses';
import { modifyIngredientsInventory } from './inventory';

export interface Account {
  id?: string;
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

export const getHistoryAccounts: any = async () =>
  await getAllDocuments(accountsCollection);

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

export const handlePay = async (
  table: string,
  ingredients: ({ name: string; amount: number }[] | undefined)[],
  total: number
) => {
  try {
    if (ingredients.length) {
      await modifyIngredientsInventory(ingredients, '-');
      const account = await dailyAccount();
      account[table] = account[table] + total;
      const updatedInventory = await updateDocument(account, 'accounts', today);
      return updatedInventory;
    }
  } catch (error) {
    handleError(error);
  }
};
