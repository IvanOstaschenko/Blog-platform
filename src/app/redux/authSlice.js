import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});
export const userStore = (state) => state.user.user;
export const { logIn, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
