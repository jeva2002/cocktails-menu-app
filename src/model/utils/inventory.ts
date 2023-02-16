import { camelCase } from './formatString';

export const addToIngredientsInventory = (
  ingredient: (string | number)[],
  inventory: any
) =>
  (inventory = {
    ...inventory,
    [ingredient[0]]: inventory[`${ingredient[0]}`] + Number(ingredient[1]),
  });

export const subtractToIngredientsInventory = (
  ingredient: (string | number)[],
  inventory: any
) =>
  (inventory = {
    ...inventory,
    [camelCase(`${ingredient[0]}`)]:
      inventory[`${ingredient[0]}`] - Number(ingredient[1]),
  });

export const newIngredient = (
  ingredient: (string | number)[],
  inventory: any
) =>
  (inventory = {
    ...inventory,
    [`${ingredient[0]}`]: Number(ingredient[1]),
  });
