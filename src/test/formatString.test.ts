import {
  camelCase,
  revertCamelCase,
  formatPrice,
  capitalize,
} from '../model/utils/formatString';

test('Capitalize a word', () => {
  expect(capitalize('juANito')).toBe('Juanito');
});

test('Common string to camelCase', () => {
  expect(camelCase('A large phrase')).toBe('aLargePhrase');
});

test('camelCased string to capitalized phrase', () => {
  expect(revertCamelCase('camelCasedPhrase')).toBe('Camel Cased Phrase');
});

test('Number without dots to string formated with dots', () => {
  expect(formatPrice(5223587535)).toBe('5.223.587.535');
});
