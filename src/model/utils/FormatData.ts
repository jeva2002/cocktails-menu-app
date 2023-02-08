export const capitalize = (text: string) => {
  const firstLetter = text[0].toUpperCase();
  const rest = text.slice(1).toLowerCase();
  return firstLetter + rest;
};