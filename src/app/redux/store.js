import { configureStore } from '@reduxjs/toolkit';
import loginSliceReducer from './userSlice.js';

const store = configureStore({
  reducer: {
    userLogin: loginSliceReducer,
  },
});

export default store;
