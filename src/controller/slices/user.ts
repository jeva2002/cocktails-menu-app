import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface User {
  email: string;
  username: string;
}

const initialState: User = {
  email: '',
  username: '',
};

const userReducer: Slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<User>) => {
      state.username = actions.payload.username;
      state.email = actions.payload.email;
    },
    clearUser: (state) => {
      state.username = '';
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userReducer.actions;

export const selectUser = (state: { user: User }) => state.user;

export default userReducer.reducer;
