import { createDocument, getDocument } from '../../../model/firebase/firestore';
import { today } from '../../../model/utils/dates';
import store from '../../../model/store/store';
import { camelCase } from '../../../model/utils/formatData';

export const dailyInventory: any = async () =>
  await getDocument('inventory/' + today);

const getIngredients = async () => await getDocument('inventory/ingredients');

export const createDailyInventory = async () => {
  try {
    const cocktails: any = store.getState().cocktails.map((e) => {
      return { [e.name]: [...e.ingredients] };
    });
    const ingredients = await getIngredients();
    const exist = await dailyInventory();
    if (ingredients && exist?.GG === undefined) {
      let inventory = {};
      cocktails.map((e: any) => {
        const ingredientsPerCocktail = Object.values(e).flatMap((num) => num);
        const avalaibleCocktails = ingredientsPerCocktail.map(
          (ingredient: any) => {
            return Math.floor(
              ingredients[camelCase(ingredient.name)] / ingredient.amount
            );
          }
        );
        const cocktailName = Object.keys(e)[0];
        return (inventory = {
          ...inventory,
          [cocktailName]: Math.min(...avalaibleCocktails),
        });
      });
      await createDocument(inventory, 'inventory', today);
    }
  } catch (error) {
    console.error(error);
  }
};
