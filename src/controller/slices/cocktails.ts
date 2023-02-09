import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getData from '../../model/api/getData';
import {
  cocktailsCollection,
  getAllDocuments,
} from '../../model/firebase/firestore';

export interface Cocktail {
  id: string;
  name: string;
  img: string;
  ingredients: string[];
  price: number;
}

const initialState: Cocktail[] = [];

const getCocktailsAPI = createAsyncThunk(
  'cocktails/getCocktailsAPI',
  async () => {
    const response = await getData();
    let cocktails = response?.drinks.map((e: any) => {
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
      cocktails.forEach((cocktail) => {
        const correspondent = ingredientsAndPrice.find(
          (e) => e.id === cocktail.id
        );
        cocktail.price = correspondent.price;
        cocktail.ingredients = correspondent.ingredients;
      });
    }
    return cocktails;
  }
);

const cocktailsReducer = createSlice({
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

export default cocktailsReducer.reducer;
