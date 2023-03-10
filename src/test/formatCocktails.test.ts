import { Cocktail } from '../controller/slices/cocktails';
import {
  formatCocktailsInventory,
  formatOrder,
  getIngredientsAndPricePerCocktail,
  formatCustomCocktails,
  formatToModifyCustomCocktails,
} from '../model/utils/formatData';

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

    const result = formatCocktailsInventory(ingredients, cocktails);

    expect(result).toEqual({
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

  const result = formatOrder(order);

  expect(result).toStrictEqual({
    table: 1,
    order: [['limonada', 1]],
  });
});

describe('Format cocktails context', () => {
  const cocktails: Cocktail[] = [
    {
      id: '100',
      img: 'frutiño',
      ingredients: [],
      name: 'bebida rara',
      price: 0,
    },
  ];
  const ingredientsAndPrice: {
    id: string;
    price: number;
    ingredients: { name: string; amount: number }[];
  }[] = [
    {
      id: '100',
      price: 1000,
      ingredients: [{ name: 'colorantes', amount: 100 }],
    },
  ];
  const customCocktails: { 0: Cocktail } | undefined = {
    0: {
      img: 'juguito',
      ingredients: [{ name: 'mango', amount: 2 }],
      name: 'juguito',
      price: 500,
    },
  };

  test('Receive a cocktail without ingredients and price and return the completed cocktail', () => {
    const result = getIngredientsAndPricePerCocktail(
      cocktails,
      ingredientsAndPrice
    );

    expect(result).toEqual([
      {
        id: '100',
        img: 'frutiño',
        ingredients: [{ name: 'colorantes', amount: 100 }],
        name: 'bebida rara',
        price: 1000,
      },
    ]);
  });

  test('Receive a custom cocktail and return it in the cocktails list', () => {
    const result = formatCustomCocktails([], customCocktails);

    expect(result).toEqual([
      {
        img: 'juguito',
        ingredients: [{ name: 'Mango', amount: 2 }],
        name: 'juguito',
        price: 500,
      },
    ]);
  });
});

describe('Format to modify custom cocktail', () => {
  const cocktail: [string, Cocktail] = [
    '1',
    {
      img: 'juguito',
      ingredients: [{ name: 'mango', amount: 2 }],
      name: 'juguito',
      price: 500,
    },
  ];

  const emptyValues: Cocktail = {
    img: '',
    ingredients: [],
    name: '',
    price: 0,
  };

  test('get any modification and return the modified object', () => {
    const modifyImage = formatToModifyCustomCocktails(
      { ...emptyValues, img: 'No hay imagen' },
      cocktail
    );
    const modifyName = formatToModifyCustomCocktails(
      { ...emptyValues, name: 'Bebida' },
      cocktail
    );
    const modifyPrice = formatToModifyCustomCocktails(
      { ...emptyValues, price: 1000 },
      cocktail
    );
    const modifyIngredients = formatToModifyCustomCocktails(
      { ...emptyValues, ingredients: [{ amount: 1, name: 'salt' }] },
      cocktail
    );

    expect(modifyImage).toEqual({ ...cocktail[1], img: 'No hay imagen' });
    expect(modifyName).toEqual({ ...cocktail[1], name: 'Bebida' });
    expect(modifyPrice).toEqual({ ...cocktail[1], price: 1000 });
    expect(modifyIngredients).toEqual({
      ...cocktail[1],
      ingredients: [{ amount: 1, name: 'salt' }],
    });
  });

  test('Receive an cocktail without changes and throw an error', () => {
    expect(() =>
      formatToModifyCustomCocktails(emptyValues, cocktail)
    ).toThrow();
  });
});
