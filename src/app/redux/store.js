import { configureStore } from '@reduxjs/toolkit';
import loginSliceReducer from './loginSlice.js';

const store = configureStore({
  reducer: {
    userLogin: loginSliceReducer,
  },
});

export default store;
