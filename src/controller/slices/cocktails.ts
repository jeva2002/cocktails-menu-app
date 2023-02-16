import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import getData from '../../model/api/getData';
import {
  cocktailsCollection,
  getAllDocuments,
} from '../../model/firebase/firestore';
import { formatCocktailsContext } from '../../model/utils/formatData';
import { getCustomCocktails } from '../handlers/dashboard/customCokctail/customCocktails';

export interface Cocktail {
  id?: string;
  name: string;
  img: string;
  ingredients: {
    name: string;
    amount: number;
  }[];
  price: number;
}

const initialState: Cocktail[] = [];

const getCocktailsAPI = createAsyncThunk(
  'cocktails/getCocktailsAPI',
  async () => {
    const responseAPI = await getData();
    let cocktails: Cocktail[] = responseAPI?.drinks.map((e: any) => {
      return {
        id: e['idDrink'],
        name: e['strDrink'],
        img: e['strDrinkThumb'],
        ingredients: [],
        price: 0,
      };
    });
    const ingredientsAndPrice: any = await getAllDocuments(cocktailsCollection);
    if (Array.isArray(ingredientsAndPrice) && Array.isArray(cocktails)) {
      const customCocktails = await getCustomCocktails();
      cocktails =
        formatCocktailsContext(
          cocktails,
          ingredientsAndPrice,
          customCocktails
        ) ?? [];
    }
    return cocktails;
  }
);

const cocktailsReducer: Slice = createSlice({
  name: 'cocktails',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCocktailsAPI.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(getCocktailsAPI.fulfilled, (state, action) => {
        if (state.length === 0) state.push(...action.payload);
      });
  },
});

export { getCocktailsAPI };
export const {} = cocktailsReducer.actions;

export const getCocktailsContext = (state: { cocktails: Cocktail[] }) =>
  state.cocktails;
export const getOneCocktail = (
  state: { cocktails: Cocktail[] },
  name: string
) => state.cocktails.find((cocktail) => cocktail.name === name);

export default cocktailsReducer.reducer;
