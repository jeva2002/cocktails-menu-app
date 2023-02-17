import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../controller/slices/user';
import cocktailsReducer from '../../controller/slices/cocktails';
import ordersReducer from '../../controller/slices/orders';
import inventoryReducer from '../../controller/slices/inventory';

const store = configureStore({
  reducer: {
    user: userReducer,
    cocktails: cocktailsReducer,
    orders: ordersReducer,
    inventory: inventoryReducer,
  },
});

export default store;
