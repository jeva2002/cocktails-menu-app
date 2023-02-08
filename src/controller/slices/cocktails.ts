import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getData from '../../model/api/getData';

interface Cocktail {
  id: string;
  name: string;
  img: string;
  ingredients: string[];
}

const initialState: Cocktail[] = [];

const getCocktailsAPI = createAsyncThunk(
  'cocktails/getCocktailsAPI',
  async () => {
    const response = await getData();
    const cocktails = response?.drinks.map((e: any) => {
      return { id: e['idDrink'], name: e['strDrink'], img: e['strDrinkThumb'] };
    });
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
        state.push(action.payload);
      });
  },
});

export { getCocktailsAPI };
export const {} = cocktailsReducer.actions;

export const getCocktailsContext = (state: { cocktails: Cocktail[] }) =>
  state.cocktails;

export default cocktailsReducer.reducer;
