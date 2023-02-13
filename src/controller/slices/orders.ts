import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface Order {
  table: number;
  order: [string, number][];
}

const initialState: Order[] = [];

const ordersReducer: Slice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      if (
        !state.some((e: Order) => e.table === action.payload.table) &&
        action.payload.order.length !== 0
      )
        state.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      let rest = state.filter((e: Order) => e.table !== action.payload.table);
      if (action.payload.order.length === 0) return [...rest];
      return [...rest, action.payload];
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      return state.filter((e: Order) => e.table !== action.payload);
    },
  },
});

export const getOrders = (state: { orders: Order[] }) => state.orders;
export const getOneOrder = (state: { orders: Order[] }, tableId: number) =>
  state.orders.find((e) => e.table === tableId);

export const { addOrder, updateOrder, removeOrder } = ordersReducer.actions;

export default ordersReducer.reducer;
