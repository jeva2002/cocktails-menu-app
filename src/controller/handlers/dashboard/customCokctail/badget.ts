import {
  Ingredients,
  SetIngredients,
} from '../../../../view/components/Dashboard/Admin/CustomCocktails/types';

export const modifyBadget = (
  operation: 'add' | 'reduce' | 'remove',
  setIngredients: SetIngredients,
  currentIngredient: number,
  amount: number
) => {
  setIngredients((ingredients) => {
    if (ingredients) {
      if (operation === 'remove') {
        const list = ingredients.filter(
          (ingredient, index) => index !== currentIngredient
        );
        return list;
      } else {
        const list = [...ingredients];
        operation === 'add'
          ? (list[currentIngredient].amount = amount + 1)
          : (list[currentIngredient].amount = amount - 1);
        return list;
      }
    }
  });
};

export const setBadget = (
  e: React.ChangeEvent<HTMLSelectElement>,
  ingredients: Ingredients,
  setIngredients: SetIngredients
) => {
  if (ingredients === undefined)
    setIngredients([{ name: e.target.value, amount: 1 }]);
  else if (
    ingredients.find((ingredient) => ingredient.name === e.target.value) ===
      undefined &&
    e.target.value !== ''
  )
    setIngredients([...ingredients, { name: e.target.value, amount: 1 }]);
};
