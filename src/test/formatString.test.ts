import {
  camelCase,
  revertCamelCase,
  formatPrice,
  capitalize,
} from '../model/utils/formatString';

test('Capitalize a word', () => {
  const word = 'juANito';

  const result = capitalize(word);

  expect(result).toBe('Juanito');
});

test('Common string to camelCase', () => {
  const string = 'A large phrase';

  const result = camelCase(string);

  expect(result).toBe('aLargePhrase');
});

test('camelCased string to capitalized phrase', () => {
  const string = 'camelCasedPhrase';

  const result = revertCamelCase(string);

  expect(result).toBe('Camel Cased Phrase');
});

test('Number without dots to string formated with dots', () => {
  const number = 5223587535;

  const result = formatPrice(number);

  expect(result).toBe('5.223.587.535');
});
