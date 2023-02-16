import { DocumentData } from 'firebase/firestore';
import { Account, Tables } from '../../controller/handlers/dashboard/accounts';
import { Cocktail } from '../../controller/slices/cocktails';
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

export const formatCocktailsInventory = (ingredients: any, cocktails: {}[]) => {
  let inventory = {};
  if (typeof ingredients === 'object' || cocktails.length === 0) {
    cocktails.map((e: {}) => {
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
  }
  return inventory;
};

export const formatOrder = (order: { table: number; order: {} }) => {
  const orderArray: any = Object.entries(order.order)
    .filter((e) => Boolean(e[1]))
    .map((e) => [e[0], typeof e[1] === 'number' ? e[1] : 0]);
  return {
    table: order.table,
    order: orderArray,
  };
};

export const getIngredientsAndPricePerCocktail = (
  cocktails: Cocktail[],
  ingredientsAndPrice: {
    id: string;
    price: number;
    ingredients: { name: string; amount: number }[] | [];
  }[]
) => {
  cocktails.forEach((cocktail) => {
    const correspondent = ingredientsAndPrice.find(
      (e: {
        id: string;
        price: number;
        ingredients: { amount: number; name: string }[];
      }) => e.id === cocktail.id
    );
    if (correspondent) {
      cocktail.price = correspondent.price;
      cocktail.ingredients = correspondent.ingredients;
    }
  });
  return cocktails;
};

export const formatCustomCocktails = (
  cocktails: Cocktail[],
  customCocktails: {}
) => {
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
  return cocktails;
};

export const formatCocktailsContext = (
  cocktails: Cocktail[],
  ingredientsAndPrice: {
    id: string;
    price: number;
    ingredients: { name: string; amount: number }[] | [];
  }[],
  customCocktails: {} | undefined
) => {
  cocktails = getIngredientsAndPricePerCocktail(cocktails, ingredientsAndPrice);
  if (customCocktails) {
    cocktails = formatCustomCocktails(cocktails, customCocktails);
  }
  return cocktails;
};

export const formatToModifyCustomCocktails = (
  values: Cocktail,
  currentCocktail: [string, Cocktail] | undefined
) => {
  if (currentCocktail) {
    let flag = false;
    const updatedValues: Cocktail = currentCocktail[1];
    if (values.img !== '' && values.img !== currentCocktail[1].img) {
      updatedValues.img = values.img;
      flag = true;
    }
    if (values.name !== '' && values.name !== currentCocktail[1].name) {
      updatedValues.name = values.name;
      flag = true;
    }
    if (values.price !== 0 && values.price !== currentCocktail[1].price) {
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
