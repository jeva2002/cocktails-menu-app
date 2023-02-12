import {
  createDocument,
  getDocument,
  updateDocument,
} from '../../../model/firebase/firestore';
import { today } from '../../../model/utils/dates';
import { camelCase } from '../../../model/utils/formatData';
import { getIngredients } from './inventory';

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

const modifyIngredientsInventory = async (
  ingredients: ({ name: string; amount: number }[] | undefined)[]
) => {
  const ingredientsList = ingredients
    .map((ingredientsPerCocktail) => {
      return ingredientsPerCocktail?.map((ingredient) => {
        return Object.values(ingredient);
      });
    })
    .flatMap((num) => num)
    .map((ingredient) => {
      if (ingredient)
        return [
          typeof ingredient[0] === 'string'
            ? camelCase(ingredient[0])
            : camelCase(ingredient[1].toString()),
          typeof ingredient[0] === 'string' ? ingredient[1] : ingredient[0],
        ];
    });
  let inventory = await getIngredients();
  ingredientsList.forEach((ingredient) => {
    if (ingredient) {
      inventory = {
        ...inventory,
        [`${ingredient[0]}`]:
          inventory[`${ingredient[0]}`] - Number(ingredient[1]),
      };
    }
  });
  await updateDocument(inventory, 'inventory', 'ingredients');
};

export const handlePay = async (
  table: string,
  ingredients: ({ name: string; amount: number }[] | undefined)[],
  total: number
) => {
  try {
    await modifyIngredientsInventory(ingredients);
    const account = await dailyAccount();
    account[table] = account[table] + total;
    return await updateDocument(account, 'accounts', today);
  } catch (error) {
    console.error(error);
  }
};
