import {
  createDocument,
  getDocument,
  listenDocument,
  updateDocument,
} from '../../../model/firebase/firestore';
import store from '../../../model/store/store';
import { today } from '../../../model/utils/dates';
import {
  formatIngredientsList,
  formatCocktailsInventory,
} from '../../../model/utils/formatData';
import { camelCase } from '../../../model/utils/formatString';
import {
  addToIngredientsInventory,
  newIngredient,
  subtractToIngredientsInventory,
} from '../../../model/utils/inventory';
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
      const cocktails: {}[] = store.getState().cocktails.map((e: any) => {
        return { [e.name]: [...e.ingredients] };
      });
      const inventory: any = formatCocktailsInventory(ingredients, cocktails);
      if (inventory.GG) {
        await createDocument(inventory, 'inventory', today);
      }
    } else throw new Error('Ha ocurrido un error al obtener los ingredientes');
  } catch (error) {
    handleError(error);
  }
};

export const operationToModifyIngredientInventory = (
  ingredient: (string | number)[],
  operation: '+' | '-' | 'new',
  inventory: any
) => {
  const afterOperation =
    operation === 'new'
      ? newIngredient(ingredient, inventory)
      : operation === '+'
      ? addToIngredientsInventory(ingredient, inventory)
      : subtractToIngredientsInventory(ingredient, inventory);
  return afterOperation;
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
        inventory = operationToModifyIngredientInventory(
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
