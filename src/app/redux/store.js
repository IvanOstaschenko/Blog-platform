import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice.js';
import { articlesApi } from '../../shared/api/index.js';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});
