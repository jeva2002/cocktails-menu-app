import { operationToModifyIngredientInventory } from '../controller/handlers/dashboard/inventory';
import {
  addToIngredientsInventory,
  newIngredient,
  subtractToIngredientsInventory,
} from '../model/utils/inventory';

describe('Receive the inventory and an ingredient with its amount and return the updated inventory', () => {
  const inventory = { curcuma: 20 };
  const ingredient = ['curcuma', 5];

  test('Add amount to existent ingredient', () => {
    const result = addToIngredientsInventory(ingredient, inventory);

    expect(result).toEqual({
      curcuma: 25,
    });
  });

  test('Subtract amount to existent ingredient', () => {
    const result = subtractToIngredientsInventory(['curcuma', 5], inventory);

    expect(result).toEqual({
      curcuma: 15,
    });
  });

  test('Create new ingredient', () => {
    const newIngredientMock = ['acelga', 5];

    const result = newIngredient(newIngredientMock, inventory);

    expect(result).toEqual({
      curcuma: 20,
      acelga: 5,
    });
  });
});
