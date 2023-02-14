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
import { handleError, handleSuccess } from '../responses';

export const dailyInventory: any = async () =>
  await getDocument('inventory/' + today);

export const getIngredients: any = async () =>
  await getDocument('inventory/ingredients');

const updateDailyInventory = async () => {
  try {
    const ingredients = await getIngredients();
    if (ingredients) {
      const inventory: any = formatInventory(ingredients);
      if (inventory.GG) {
        await createDocument(inventory, 'inventory', today);
      } 
    } else throw new Error('Ha ocurrido un error al obtener los ingredientes');
  } catch (error) {
    handleError(error);
  }
};

export const modifyIngredientsInventory = async (
  ingredients: ({ name: string; amount: number }[] | undefined)[],
  operation: '+' | '-' | 'new'
) => {
  const ingredientsList = formatIngredientsList(ingredients);
  let inventory = await getIngredients();
  try {
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
      } else
        throw new Error('Ha ocurrido un error al obtener los ingredientes');
    });
    await updateDocument(inventory, 'inventory', 'ingredients');
    handleSuccess('La operación ha sido exitosa');
  } catch (error) {
    handleError(error);
  }
};

export const listenInventory = async () => {
  return await listenDocument(
    'inventory',
    'ingredients',
    async () => await updateDailyInventory()
  );
};
