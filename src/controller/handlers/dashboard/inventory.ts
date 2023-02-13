import {
  createDocument,
  getDocument,
  listenDocument,
  updateDocument,
} from '../../../model/firebase/firestore';
import { today } from '../../../model/utils/dates';
import store from '../../../model/store/store';
import {
  camelCase,
  formatIngredientsList,
  revertCamelCase,
} from '../../../model/utils/formatData';
import { DocumentData } from 'firebase/firestore';

export const dailyInventory: any = async () =>
  await getDocument('inventory/' + today);

export const getIngredients: any = async () =>
  await getDocument('inventory/ingredients');

const formatInventory = (ingredients: DocumentData) => {
  const cocktails: any = store.getState().cocktails.map((e) => {
    return { [e.name]: [...e.ingredients] };
  });
  console.log(cocktails);
  let inventory = {};
  cocktails.map((e: any) => {
    const ingredientsPerCocktail = Object.values(e).flatMap((num) => num);
    const avalaibleCocktails = ingredientsPerCocktail.map((ingredient: any) => {
      return Math.floor(
        ingredients[camelCase(ingredient.name)] / ingredient.amount
      );
    });
    const cocktailName = Object.keys(e)[0];
    return (inventory = {
      ...inventory,
      [cocktailName]: Math.min(...avalaibleCocktails),
    });
  });
  return inventory;
};

export const createDailyInventory = async () => {
  try {
    const ingredients = await getIngredients();
    const exist = await dailyInventory();
    if (ingredients && exist?.GG === undefined) {
      const inventory = formatInventory(ingredients);
      await createDocument(inventory, 'inventory', today);
    }
  } catch (error) {
    console.error(error);
  }
};

const updateDailyInventory = async () => {
  // try {
  //   const ingredients = await getIngredients();
  //   if (ingredients) {
  //     const inventory = formatInventory(ingredients);
  //     await createDocument(inventory, 'inventory', today);
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
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
