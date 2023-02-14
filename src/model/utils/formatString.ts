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

export const formatPrice = (number: number | undefined) => {
  if (number) {
    const numberList = number.toString().split('').reverse();
    let finalNumber = '';
    const triad: string[] = [];
    let counter = 0;
    numberList.forEach((num) => {
      if (counter === 0) triad.push(num);
      if (counter === 1 || counter === 2)
        triad[triad.length - 1] = num + triad[triad.length - 1];
      if (counter === 3) {
        triad.push(num);
        counter = 0;
      }
      counter++;
    });
    triad.reverse().forEach((num, index) => {
      if (index === 0) finalNumber = num;
      else finalNumber += '.' + num;
    });
    return finalNumber;
  }
  return '0';
};
