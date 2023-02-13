import { DocumentData } from 'firebase/firestore';
import { Cocktail } from '../../controller/slices/cocktails';
import store from '../store/store';
import { camelCase, revertCamelCase } from './formatString';

export const getTotal = (totalList: number[] | undefined) => {
  if (totalList) {
    return totalList.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
};

export const formatIngredientsList = (
  ingredients: ({ name: string; amount: number }[] | undefined)[]
) => {
  return ingredients
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
};

export const formatInventory = (ingredients: DocumentData) => {
  const cocktails: any = store.getState().cocktails.map((e) => {
    return { [e.name]: [...e.ingredients] };
  });
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

export const formatOrder = (order: { table: number; order: {} }) => {
  const orderArray: any = Object.entries(order.order)
    .filter((e) => e[1] !== undefined)
    .map((e) => [e[0], typeof e[1] === 'number' ? e[1] : 0]);
  return {
    table: order.table,
    order: orderArray,
  };
};

export const formatCocktails = async (
  cocktails: Cocktail[],
  ingredientsAndPrice: any,
  customCocktails: DocumentData | undefined
) => {
  cocktails.forEach((cocktail) => {
    const correspondent: Cocktail = ingredientsAndPrice.find(
      (e: { id: string; price: number; ingredients: [] }) =>
        e.id === cocktail.id
    );
    cocktail.price = correspondent.price;
    cocktail.ingredients = correspondent.ingredients;
  });
  if (customCocktails) {
    const formatedCustomCocktails: Cocktail[] = Object.values(customCocktails);
    formatedCustomCocktails.forEach((cocktail) =>
      cocktails.push({
        ...cocktail,
        ingredients: cocktail.ingredients.map((ingredient) => {
          return {
            name: revertCamelCase(ingredient.name),
            amount: ingredient.amount,
          };
        }),
      })
    );
  }
  return cocktails;
};
