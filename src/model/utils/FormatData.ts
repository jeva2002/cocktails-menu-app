import { DocumentData } from 'firebase/firestore';
import { Account, Tables } from '../../controller/handlers/dashboard/accounts';
import { Cocktail } from '../../controller/slices/cocktails';
import store from '../store/store';
import { camelCase, revertCamelCase } from './formatString';

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
            ? ingredient[0]
            : ingredient[1].toString(),
          typeof ingredient[0] === 'string' ? ingredient[1] : ingredient[0],
        ];
    });
};

export const formatInventory = (ingredients: DocumentData) => {
  const cocktails: any = store.getState().cocktails.map((e: any) => {
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

export const formatCustomCocktails = (
  values: Cocktail,
  currentCocktail: [string, any] | undefined
) => {
  if (currentCocktail) {
    let flag = false;
    const updatedValues: Cocktail = currentCocktail[1];
    if (values.img !== '') {
      updatedValues.img = values.img;
      flag = true;
    }
    if (values.name !== '') {
      updatedValues.name = values.name;
      flag = true;
    }
    if (values.price !== 0) {
      updatedValues.price = values.price;
      flag = true;
    }
    if (values.ingredients !== undefined) {
      if (values.ingredients.length > 0) {
        updatedValues.ingredients = values.ingredients;
        flag = true;
      }
    }
    if (flag) {
      return updatedValues;
    } else throw new Error('Se requiere de al menos un cambio');
  }
};

export const formatSales = (sales: Account | undefined) => {
  if (sales) {
    return Object.entries(sales)
      .map((sale) => {
        for (let table in Tables) {
          if (sale[0] === table)
            return { table: parseInt(Tables[table]) + 1, total: sale[1] };
        }
      })
      .sort((a, b) => {
        if (a?.table && b?.table) return a.table - b.table;
        else return 0;
      });
  }
};
