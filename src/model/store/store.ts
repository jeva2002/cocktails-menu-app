import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../controller/slices/user';
import cocktailsReducer from '../../controller/slices/cocktails';
import ordersReducer from '../../controller/slices/orders';

const store = configureStore({
  reducer: {
    user: userReducer,
    cocktails: cocktailsReducer,
    orders: ordersReducer,
  },
});

export default store;
