import {
  createDocument,
  getDocument,
  listenDocument,
  updateDocument,
} from '../../../../model/firebase/firestore';
import { formatCustomCocktails } from '../../../../model/utils/formatData';
import { camelCase } from '../../../../model/utils/formatString';
import { Cocktail } from '../../../slices/cocktails';
import { handleConfirm, handleError, handleSuccess } from '../../responses';

export const getCustomCocktails = async () =>
  await getDocument('cocktails/customCocktails');

export const createCustomCocktail = async (
  data: Cocktail,
  reset: () => void
) => {
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
    handleSuccess('Se ha creado exitosamente');
    reset();
  } catch (error) {
    handleError(error);
  }
};

export const deleteCustomCocktail = async (
  data: {},
  modifyCurrentList: () => void
) => {
  try {
    handleConfirm(async () => {
      await createDocument(data, 'cocktails', 'customCocktails');
      modifyCurrentList();
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateCustomCocktail = async (
  values: Cocktail,
  currentCocktail: [string, any] | undefined,
  list: [string, any][]
) => {
  const formatData = formatCustomCocktails(values, currentCocktail);
  if (formatData && currentCocktail) {
    list[Number(currentCocktail[0])][1] = formatData;
    try {
      await updateDocument(
        Object.fromEntries(list),
        'cocktails',
        'customCocktails'
      );
      handleSuccess('Se ha actualizado correctamente');
    } catch (error) {
      handleError(error);
    }
  }
};

export const listenCustomCocktails = async (setCocktails: () => void) => {
  try {
    return await listenDocument('cocktails', 'customCocktails', async () => {
      setCocktails();
    });
  } catch (error) {
    console.log(error);
  }
};
