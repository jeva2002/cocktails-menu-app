import { createDocument, getDocument } from '../../../model/firebase/firestore';
import { camelCase } from '../../../model/utils/formatData';
import { Cocktail } from '../../slices/cocktails';

export const getCustomCocktails = async () =>
  await getDocument('cocktails/customCocktails');

export const createCustomCocktail = async (data: Cocktail) => {
  try {
    const customCocktails: any = await getCustomCocktails();
    if (customCocktails) {
      const list: Cocktail[] = Object.values(customCocktails);
      if (
        list.find((cocktail: Cocktail) => cocktail.name === data.name) ===
        undefined
      ) {
        data.name = camelCase(data.name);
        list.push(data);
        await createDocument({ ...list }, 'cocktails', 'customCocktails');
      }
    } else await createDocument({ '0': data }, 'cocktails', 'customCocktails');
  } catch (error) {
    console.log(error);
  }
};
