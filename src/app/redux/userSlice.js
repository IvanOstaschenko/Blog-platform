import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});
export const userStore = (state) => state.user.user;
export const { logIn, logOut } = UserSlice.actions;
export default UserSlice.reducer;
