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
import { camelCase } from '../../../model/utils/formatString';
import { IngredientValues } from '../../../view/components/Dashboard/Admin/Inventory/AddIngredient/AddIngredient';
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

const selectOperationToModifyIngredientInventory = (
  ingredient: (string | number)[],
  operation: '+' | '-' | 'new',
  inventory: any
) => {
  return operation === 'new'
    ? (inventory = {
        ...inventory,
        [`${ingredient[0]}`]: Number(ingredient[1]),
      })
    : (inventory = {
        ...inventory,
        [`${
          operation === '+' ? ingredient[0] : camelCase(`${ingredient[0]}`)
        }`]:
          operation === '+'
            ? inventory[`${ingredient[0]}`] + Number(ingredient[1])
            : inventory[camelCase(`${ingredient[0]}`)] - Number(ingredient[1]),
      });
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
        inventory = selectOperationToModifyIngredientInventory(
          ingredient,
          operation,
          inventory
        );
      } else
        throw new Error('Ha ocurrido un error al obtener los ingredientes');
    });
    await updateDocument(inventory, 'inventory', 'ingredients');
    handleSuccess('La operación ha sido exitosa');
  } catch (error) {
    handleError(error);
  }
};

export const handleAddIngredients = (
  values: IngredientValues,
  ingredients: [string, number][]
) => {
  const currentIngredient = ingredients.find(
    (ingredient) => ingredient[0] === values.name
  );
  if (currentIngredient) {
    modifyIngredientsInventory([[values]], '+');
  }
};

export const listenInventory = async () => {
  return await listenDocument(
    'inventory',
    'ingredients',
    async () => await updateDailyInventory()
  );
};
