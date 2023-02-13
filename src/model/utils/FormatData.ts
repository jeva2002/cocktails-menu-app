import { DocumentData } from 'firebase/firestore';
import { getCustomCocktails } from '../../controller/handlers/dashboard/customCocktails';
import { Cocktail } from '../../controller/slices/cocktails';
import store from '../store/store';

export const capitalize = (text: string) => {
  const firstLetter = text[0].toUpperCase();
  const rest = text.slice(1).toLowerCase();
  return firstLetter + rest;
};

export const camelCase = (phrase: string) => {
  const listOfWords: string[] = phrase.split(' ');
  let result = '';
  listOfWords.forEach((word, index) => {
    word = word.toLowerCase();
    if (index > 0) word = capitalize(word);
    result += word;
  });
  return result;
};

export const revertCamelCase = (phrase: string) => {
  const letters = phrase.split('');
  const words: string[] = [];
  let contador = 0;
  letters.forEach((letter, index) => {
    if (index === 0) words[0] = letter.toUpperCase();
    else if (/[A-Z]/.test(letter)) {
      words.push(letter);
      contador += 1;
    } else words[contador] += letter;
  });
  let finalPhrase = '';
  words.forEach((word, index) => {
    if (index === 0) finalPhrase = word;
    else finalPhrase += ' ' + word;
  });
  return finalPhrase;
};

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
  ingredientsAndPrice: any
) => {
  cocktails.forEach((cocktail) => {
    const correspondent = ingredientsAndPrice.find((e) => e.id === cocktail.id);
    cocktail.price = correspondent.price;
    cocktail.ingredients = correspondent.ingredients;
  });
  const exist = await getCustomCocktails();
  if (exist) {
    const customCocktails: Cocktail[] = Object.values(exist);
    customCocktails.forEach((cocktail) =>
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
  }
};
