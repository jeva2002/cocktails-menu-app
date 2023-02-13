export const capitalize = (text: string) => {
  const firstLetter = text[0].toUpperCase();
  const rest = text.slice(1).toLowerCase();
  return firstLetter + rest;
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

export const getTotal = (totalList: number[] | undefined) => {
  if (totalList) {
    return totalList.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
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