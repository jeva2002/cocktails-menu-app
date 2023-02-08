import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';

export interface User {
  email: string;
  username: string;
}

const initialState: User = {
  email: '',
  username: '',
};

const userReducer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<User>) => {
      state.username = actions.payload.username;
      state.email = actions.payload.email;
    },
  },
});

export const { setUser } = userReducer.actions;

export const selectUser = (state: { user: User }) => state.user;

export default userReducer.reducer;
