import { formatIngredientsList } from '../model/utils/formatData';

test('Receive an array of objects with names and amount, and return an array with the name in the first position and the amount number in the second', () => {
  const ingredients = [
    [{ name: 'egg', amount: 15 }],
    [{ name: 'beer', amount: 3 }],
  ];

  const result = formatIngredientsList(ingredients);

  expect(result).toStrictEqual([
    ['egg', 15],
    ['beer', 3],
  ]);
});
