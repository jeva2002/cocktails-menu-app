import {
  createDocument,
  getDocument,
  listenDocument,
  updateDocument,
} from '../../../model/firebase/firestore';
import { today } from '../../../model/utils/dates';
import {
  formatIngredientsList,
  formatInventory,
} from '../../../model/utils/formatData';

export const dailyInventory: any = async () =>
  await getDocument('inventory/' + today);

export const getIngredients: any = async () =>
  await getDocument('inventory/ingredients');

//@deprecated
// export const createDailyInventory = async () => {
//   try {
//     const ingredients = await getIngredients();
//     const exist = await dailyInventory();
//     if (ingredients && exist?.GG === undefined) {
//       const inventory = formatInventory(ingredients);
//       console.log(inventory);
//       await createDocument(inventory, 'inventory', today);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

const updateDailyInventory = async () => {
  try {
    const ingredients = await getIngredients();
    if (ingredients) {
      const inventory: any = formatInventory(ingredients);
      if (inventory.GG) await createDocument(inventory, 'inventory', today);
    }
  } catch (error) {
    console.error(error);
  }
};

export const modifyIngredientsInventory = async (
  ingredients: ({ name: string; amount: number }[] | undefined)[],
  operation: '+' | '-' | 'new'
) => {
  const ingredientsList = formatIngredientsList(ingredients);
  let inventory = await getIngredients();
  ingredientsList.forEach((ingredient) => {
    if (ingredient) {
      operation === 'new'
        ? (inventory = {
            ...inventory,
            [`${ingredient[0]}`]: Number(ingredient[1]),
          })
        : (inventory = {
            ...inventory,
            [`${ingredient[0]}`]:
              operation === '+'
                ? inventory[`${ingredient[0]}`] + Number(ingredient[1])
                : inventory[`${ingredient[0]}`] - Number(ingredient[1]),
          });
    }
  });
  await updateDocument(inventory, 'inventory', 'ingredients');
};

export const listenInventory = async () => {
  return await listenDocument('inventory', 'ingredients', () =>
    updateDailyInventory()
  );
};
