import { Order } from '../../controller/slices/orders';

export const capitalize = (text: string) => {
  const firstLetter = text[0].toUpperCase();
  const rest = text.slice(1).toLowerCase();
  return firstLetter + rest;
};

export const formatOrder = (order: Order) => {
  const orderArray = Object.entries(order.order);
  return {
    table: order.table,
    order: orderArray.filter((e) => e[1] !== undefined),
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
