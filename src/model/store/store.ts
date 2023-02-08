import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../controller/slices/user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
