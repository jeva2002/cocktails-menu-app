import { format } from 'date-fns';
import {
  createDocument,
  getDocument,
  updateDocument,
} from '../../../model/firebase/firestore';

export interface Account {
  eighthTable?: number;
  seventhTable?: number;
  sixthTable?: number;
  fifthTable?: number;
  fourthTable?: number;
  thirdTable?: number;
  secondTable?: number;
  firstTable?: number;
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
  eighthTable: 0,
  seventhTable: 0,
  sixthTable: 0,
  fifthTable: 0,
  fourthTable: 0,
  thirdTable: 0,
  secondTable: 0,
  firstTable: 0,
};

const date = format(Date.now(), 'dd-MM-yyyy');

export const createDailyAccount = async () => {
  try {
    const docRef: any = await getDocument('accounts/' + date);
    if (docRef.eighthTable === undefined) {
      const newDoc = await createDocument(newAccount, 'accounts', date);
      return newDoc;
    }
  } catch (error) {
    console.error(error);
  }
};

export const handlePay = async (table: string, total: number) => {
  try {
    const docRef: any = await getDocument('accounts/' + date);
    docRef[table] = docRef[table] + total;
    return await updateDocument(docRef, 'accounts', date);
  } catch (error) {
    console.error(error);
  }
};
