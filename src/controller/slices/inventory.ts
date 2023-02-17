import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../handlers/dashboard/inventory';

type Ingredients = [string, number][];

const INITIAL_STATE: Ingredients = [];

export const getIngredientsFromInventory = createAsyncThunk(
  'inventory/getIngredients',
  async () => {
    const ingredients: any[] = [];
    const ingredientsObject = Object.entries(await getIngredients());
    ingredients.push(
      ...ingredientsObject.map((e) => [e[0], parseInt(`${e[1]}`)])
    );

    return ingredients;
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: INITIAL_STATE,
  reducers: {
    addIngredient: (state, action: PayloadAction<[string, number]>) => {
      const currentElement = state.find(
        (ingredient) => action.payload[0] === ingredient[0]
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsFromInventory.fulfilled, (state, action) => {
      if (state.length === 0) state.push(...action.payload);
    });
  },
});

export const getIngredientsContext = (state: Ingredients) => state;

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
