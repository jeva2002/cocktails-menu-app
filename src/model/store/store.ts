import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../controller/slices/user';
import cocktailsReducer from '../../controller/slices/cocktails';

const store = configureStore({
  reducer: {
    user: userReducer,
    cocktails: cocktailsReducer,
  },
});

export default store;
