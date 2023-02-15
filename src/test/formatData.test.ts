import {
  formatIngredientsList,
  formatCocktailsInventory,
  formatOrder,
} from '../model/utils/formatData';

test('Receive an array of objects with names and amount, and return an array with the name in the first position and the amount number in the second', () => {
  expect(
    formatIngredientsList([
      [{ name: 'egg', amount: 15 }],
      [{ name: 'beer', amount: 3 }],
    ])
  ).toStrictEqual([
    ['egg', 15],
    ['beer', 3],
  ]);
});

describe('Format cocktails inventory', () => {
  test('Receive an object of amounts per ingredient and a list of cocktails and return an object with the max number of cocktails avalaibles', () => {
    const ingredients = {
      salt: 15,
      lemon: 2,
    };
    const cocktails = [
      {
        michelada: [
          { name: 'salt', amount: 15 },
          { name: 'lemon', amount: 2 },
        ],
      },
      {
        limonada: [{ name: 'lemon', amount: 1 }],
      },
    ];

    expect(formatCocktailsInventory(ingredients, cocktails)).toEqual({
      michelada: 1,
      limonada: 2,
    });
  });

  test('Return an empty object', () => {
    const cocktails = [
      {
        limonada: [{ name: 'lemon', amount: 1 }],
      },
    ];

    expect(formatCocktailsInventory({}, [])).toEqual({});
    expect(formatCocktailsInventory(2, cocktails)).toEqual({});
    expect(formatCocktailsInventory('a', cocktails)).toEqual({});
    expect(formatCocktailsInventory(false, cocktails)).toEqual({});
  });
});

test('Receive an object with an order property that contains an object with useless properties and return tha same object with the order property as an array with the relevant values', () => {
  const order = {
    table: 1,
    order: {
      michelada: null,
      limonada: 1,
      cafe: undefined,
    },
  };
  expect(formatOrder(order)).toStrictEqual({
    table: 1,
    order: [['limonada', 1]],
  });
});
