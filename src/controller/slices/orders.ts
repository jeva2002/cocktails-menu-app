import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  table: number;
  order: {};
}

const initialState: Order[] = [];

const ordersReducer = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      if (
        !state.some(
          (e) =>
            e.table === action.payload.table ||
            Object.keys(action.payload.order).length === 0
        )
      )
        state.push(action.payload);
    },
    removeOrder: (state, action) => {},
  },
});

export const getOrders = (state: { orders: Order[] }) => state.orders;

export const { addOrder } = ordersReducer.actions;

export default ordersReducer.reducer;
